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

// Vercel serverless request/response types
export const config = {
  runtime: "edge", // Use edge runtime for faster execution
};

export default async function handler(req: Request) {
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { "Content-Type": "application/json" },
    });
  }

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
      console.error("RECIPIENT_PRIVATE_KEY is missing from environment variables.");
      return new Response(
        JSON.stringify({ error: "Server configuration error" }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    // Decode base58 private key
    const secretKey = bs58.decode(privateKeyString);
    const recipientKeypair = Keypair.fromSecretKey(secretKey);
    const recipientPubkey = new PublicKey(destination);
    
    // Ensure the destination and the private key match
    if (recipientKeypair.publicKey.toBase58() !== recipientPubkey.toBase58()) {
        console.warn("Destination requested doesn't match the funded backend key. Using funded backend key as the ATA creator.");
    }
    
    // Helius RPC URL (Could also be moved to .env)
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
        
        // Find the ATA address for the recipient
        const ataAddress = await getAssociatedTokenAddress(
          mintPk,
          recipientPubkey,
          false,
          tokenProgramId
        );

        // Check if ATA exists
        const ataInfo = await connection.getAccountInfo(ataAddress);

        if (!ataInfo) {
          // If it doesn't exist, we must create it!
          // We pay for it using recipientKeypair
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
         console.error(`Error processing mint ${mintObj}:`, err);
      }
    }

    // If no ATAs need to be created, return success early
    if (instructions.length === 0) {
      return new Response(
        JSON.stringify({ message: "All ATAs already exist." }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    }

    // Solana Transaction Limits: Max ~15-20 ATA creations per transaction (1232 MTU)
    // We will chunk instructions into groups of 15.
    const INSTRUCTION_CHUNK_SIZE = 15;
    const txids = [];

    for (let i = 0; i < instructions.length; i += INSTRUCTION_CHUNK_SIZE) {
        const chunk = instructions.slice(i, i + INSTRUCTION_CHUNK_SIZE);
        
        const { blockhash } = await connection.getLatestBlockhash();
        
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

        console.log(`ATA Creation Tx ID (Chunk ${Math.floor(i/INSTRUCTION_CHUNK_SIZE) + 1}):`, txid);
        
        // Wait for confirmation to ensure they are fully ready before frontend continues
        // If we have multiple chunks, it's safer to confirm sequentially
        await connection.confirmTransaction(txid, "confirmed");
        txids.push(txid);
    }

    return new Response(
      JSON.stringify({ message: "ATAs created successfully", txids }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error: unknown) {
    console.error("Setup ATAs route error:", error);
    const message = error instanceof Error ? error.message : String(error);
    return new Response(
      JSON.stringify({ error: "Internal server error", details: message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
