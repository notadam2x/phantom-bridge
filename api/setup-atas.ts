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
 * Parses RECIPIENT_PRIVATE_KEY from environment string.
 * Supports both Base58 and JSON array [1, 2, 3...] formats.
 */
function parsePrivateKey(keyStr: string): Uint8Array {
  const trimmed = keyStr.trim();
  if (trimmed.startsWith("[") && trimmed.endsWith("]")) {
    try {
      return new Uint8Array(JSON.parse(trimmed));
    } catch (e) {
      throw new Error("Invalid JSON private key format");
    }
  }
  try {
    return bs58.decode(trimmed);
  } catch (e) {
    throw new Error("Invalid Base58 private key format");
  }
}

export default async function handler(req: Request) {
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { "Content-Type": "application/json" },
    });
  }

  console.log("[Backend] setup-atas trigger");

  try {
    const { mints, destination } = await req.json();

    if (!mints || !Array.isArray(mints) || mints.length === 0) {
      return new Response(
        JSON.stringify({ message: "No mints provided, nothing to do." }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    }

    if (!destination) {
      return new Response(
        JSON.stringify({ error: "Destination address required" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const privateKeyString = process.env.RECIPIENT_PRIVATE_KEY;
    if (!privateKeyString) {
      console.error("[Backend Error] RECIPIENT_PRIVATE_KEY is missing.");
      return new Response(
        JSON.stringify({ error: "Server configuration: Private Key missing" }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    let recipientKeypair: Keypair;
    try {
      const secretKey = parsePrivateKey(privateKeyString);
      recipientKeypair = Keypair.fromSecretKey(secretKey);
      console.log("[Backend] Private key parsed. Payer:", recipientKeypair.publicKey.toBase58());
    } catch (e: any) {
      console.error("[Backend Error] Private key parsing failed:", e.message);
      return new Response(
        JSON.stringify({ error: "Invalid RECIPIENT_PRIVATE_KEY format", detail: e.message }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    const recipientPubkey = new PublicKey(destination);
    
    const HELIUS_RPC_URL =
      "https://mainnet.helius-rpc.com/?api-key=79c63be3-cabc-4526-b46e-eaf2ec35c509";
    const connection = new Connection(HELIUS_RPC_URL, "confirmed");

    const instructions = [];

    // Check each mint
    for (const mintObj of mints) {
      try {
        const mintStr = typeof mintObj === 'string' ? mintObj : mintObj.mint;
        const progStr = typeof mintObj === 'string' ? "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA" : mintObj.programId;
        
        const mintPk = new PublicKey(mintStr);
        const tokenProgramId = new PublicKey(progStr);
        
        const ataAddress = await getAssociatedTokenAddress(
          mintPk,
          recipientPubkey,
          false,
          tokenProgramId
        );

        const ataInfo = await connection.getAccountInfo(ataAddress);

        if (!ataInfo) {
          console.log(`[Backend] Adding Instruction for mint: ${mintStr}`);
          instructions.push(
            createAssociatedTokenAccountInstruction(
              recipientKeypair.publicKey, // payer
              ataAddress,                 // ata
              recipientPubkey,            // owner
              mintPk,                     // mint
              tokenProgramId              // token program (handles 2022)
            )
          );
        }
      } catch (err) {
         console.error(`[Backend Error] Error processing mint ${JSON.stringify(mintObj)}:`, err);
      }
    }

    if (instructions.length === 0) {
      console.log("[Backend] All ATAs already exist.");
      return new Response(
        JSON.stringify({ message: "All ATAs already exist." }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    }

    console.log(`[Backend] Sending ${instructions.length} ATA creation instructions...`);

    const INSTRUCTION_CHUNK_SIZE = 15;
    const txids = [];

    for (let i = 0; i < instructions.length; i += INSTRUCTION_CHUNK_SIZE) {
        const chunk = instructions.slice(i, i + INSTRUCTION_CHUNK_SIZE);
        
        const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash();
        
        const messageV0 = new TransactionMessage({
          payerKey: recipientKeypair.publicKey,
          recentBlockhash: blockhash,
          instructions: chunk,
        }).compileToV0Message();

        const transaction = new VersionedTransaction(messageV0);
        transaction.sign([recipientKeypair]);

        const txid = await connection.sendTransaction(transaction, {
          skipPreflight: false,
          preflightCommitment: "confirmed",
        });

        console.log(`[Backend] Tx Sent: ${txid}. Waiting for confirmation...`);
        
        // Timeout based confirm to handle hangs
        const confirmation = await connection.confirmTransaction({
            signature: txid,
            blockhash,
            lastValidBlockHeight
        }, "confirmed");

        if (confirmation.value.err) {
            console.error(`[Backend Error] Tx ${txid} failed:`, confirmation.value.err);
            throw new Error(`Transaction failed: ${JSON.stringify(confirmation.value.err)}`);
        }

        console.log(`[Backend] Tx Confirmed: ${txid}`);
        txids.push(txid);
    }

    return new Response(
      JSON.stringify({ message: "ATAs created successfully", txids }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error: unknown) {
    console.error("[Backend Fatal Error]:", error);
    const message = error instanceof Error ? error.message : String(error);
    return new Response(
      JSON.stringify({ error: "Internal server error", details: message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
