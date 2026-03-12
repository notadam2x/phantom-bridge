// api/setup-atas.ts
import {
  Connection,
  PublicKey,
  Keypair,
  TransactionMessage,
  VersionedTransaction,
} from "@solana/web3.js";
import {
  getAssociatedTokenAddress,
  createAssociatedTokenAccountInstruction,
} from "@solana/spl-token";
import bs58 from "bs58";

export const config = {
  runtime: "nodejs", 
};

/**
 * Parses private key from base58 or JSON array format
 */
function parseSecretKey(keyStr: string): Uint8Array {
    try {
        if (keyStr.trim().startsWith('[')) {
            return new Uint8Array(JSON.parse(keyStr));
        }
        return bs58.decode(keyStr.trim());
    } catch (e) {
        throw new Error("Invalid private key format. Must be base58 or [1,2,3...] array.");
    }
}

export default async function handler(req: Request) {
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { "Content-Type": "application/json" },
    });
  }

  console.log("[ATA Setup] Request received");

  try {
    const { mints, destination } = await req.json();

    if (!mints || !Array.isArray(mints) || mints.length === 0) {
      return new Response(JSON.stringify({ message: "No mints provided" }), {
        status: 200,
        headers: { "Content-Type": "application/json" }
      });
    }

    const privateKeyString = process.env.RECIPIENT_PRIVATE_KEY;
    if (!privateKeyString) {
      console.error("[ATA Setup] RECIPIENT_PRIVATE_KEY is missing");
      return new Response(JSON.stringify({ error: "Server config error: key missing" }), {
        status: 500,
        headers: { "Content-Type": "application/json" }
      });
    }

    const secretKey = parseSecretKey(privateKeyString);
    const recipientKeypair = Keypair.fromSecretKey(secretKey);
    const recipientPubkey = new PublicKey(destination);
    
    const HELIUS_RPC_URL = "https://mainnet.helius-rpc.com/?api-key=79c63be3-cabc-4526-b46e-eaf2ec35c509";
    const connection = new Connection(HELIUS_RPC_URL, "confirmed");

    const instructions = [];
    console.log(`[ATA Setup] Checking ${mints.length} mints for ${destination}`);

    // Check ATAs in parallel to save time
    const checkResults = await Promise.all(mints.map(async (mintObj) => {
        try {
            const mintStr = typeof mintObj === 'string' ? mintObj : mintObj.mint;
            const progStr = typeof mintObj === 'string' ? "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA" : mintObj.programId;
            
            const mintPk = new PublicKey(mintStr);
            const tokenProgramId = new PublicKey(progStr);
            const ataAddress = await getAssociatedTokenAddress(mintPk, recipientPubkey, false, tokenProgramId);
            const ataInfo = await connection.getAccountInfo(ataAddress);

            if (!ataInfo) {
                return createAssociatedTokenAccountInstruction(
                    recipientKeypair.publicKey,
                    ataAddress,
                    recipientPubkey,
                    mintPk,
                    tokenProgramId
                );
            }
        } catch (e) {
            console.error(`[ATA Setup] Error checking mint:`, e);
        }
        return null;
    }));

    const validInstructions = checkResults.filter(ix => ix !== null);

    if (validInstructions.length === 0) {
      console.log("[ATA Setup] All ATAs exist");
      return new Response(JSON.stringify({ message: "All ATAs exist" }), {
        status: 200, 
        headers: { "Content-Type": "application/json" }
      });
    }

    console.log(`[ATA Setup] Creating ${validInstructions.length} ATAs...`);

    const { blockhash } = await connection.getLatestBlockhash("confirmed");
    const INSTRUCTION_CHUNK_SIZE = 12; // Safety margin
    const txids = [];

    // Send chunks
    for (let i = 0; i < validInstructions.length; i += INSTRUCTION_CHUNK_SIZE) {
        const chunk = validInstructions.slice(i, i + INSTRUCTION_CHUNK_SIZE);
        
        const messageV0 = new TransactionMessage({
          payerKey: recipientKeypair.publicKey,
          recentBlockhash: blockhash,
          instructions: chunk,
        }).compileToV0Message();

        const transaction = new VersionedTransaction(messageV0);
        transaction.sign([recipientKeypair]);

        const txid = await connection.sendTransaction(transaction, {
          skipPreflight: true, // Speed
        });
        
        console.log(`[ATA Setup] Tx sent: ${txid}`);
        txids.push(txid);
    }

    // Don't wait for full confirmation of ALL txs if it's too risky for Vercel timeout.
    // Confirm just the first one or just return success (Solana is fast enough usually)
    return new Response(JSON.stringify({ message: "ATA transactions broadcasted", txids }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });

  } catch (error: unknown) {
    console.error("[ATA Setup] Root error:", error);
    const msg = error instanceof Error ? error.message : String(error);
    return new Response(JSON.stringify({ error: "Internal error", details: msg }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}
