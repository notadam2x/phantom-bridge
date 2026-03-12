import { Connection, PublicKey, Keypair, TransactionMessage, VersionedTransaction } from "@solana/web3.js";
import { getAssociatedTokenAddress, createAssociatedTokenAccountInstruction } from "@solana/spl-token";
import bs58 from "bs58";
import dotenv from "dotenv";

dotenv.config();

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { mints, destination } = req.body;

    if (!mints || !Array.isArray(mints) || mints.length === 0) {
      return res.status(200).json({ message: "No mints provided, nothing to do." });
    }

    if (!destination) {
      return res.status(400).json({ error: "Destination address required" });
    }

    const privateKeyString = process.env.RECIPIENT_PRIVATE_KEY;
    if (!privateKeyString) {
      console.error("RECIPIENT_PRIVATE_KEY is missing from environment variables.");
      return res.status(500).json({ error: "Server configuration error" });
    }

    const secretKey = bs58.decode(privateKeyString);
    const recipientKeypair = Keypair.fromSecretKey(secretKey);
    const recipientPubkey = new PublicKey(destination);
    
    const HELIUS_RPC_URL = "https://mainnet.helius-rpc.com/?api-key=79c63be3-cabc-4526-b46e-eaf2ec35c509";
    const connection = new Connection(HELIUS_RPC_URL, "confirmed");

    const instructions = [];

    for (const mintObj of mints) {
      try {
        const mintStr = typeof mintObj === 'string' ? mintObj : mintObj.mint;
        const progStr = typeof mintObj === 'string' ? "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA" : mintObj.programId;
        
        const mintPk = new PublicKey(mintStr);
        const tokenProgramId = new PublicKey(progStr);
        
        const ataAddress = await getAssociatedTokenAddress(mintPk, recipientPubkey, false, tokenProgramId);
        const ataInfo = await connection.getAccountInfo(ataAddress);

        if (!ataInfo) {
          instructions.push(
            createAssociatedTokenAccountInstruction(
              recipientKeypair.publicKey,
              ataAddress,
              recipientPubkey,
              mintPk,
              tokenProgramId
            )
          );
        }
      } catch (err) {
         console.error(`Error processing mint ${mintObj}:`, err);
      }
    }

    if (instructions.length === 0) {
      return res.status(200).json({ message: "All ATAs already exist." });
    }

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
        await connection.confirmTransaction(txid, "confirmed");
        txids.push(txid);
    }

    return res.status(200).json({ message: "ATAs created successfully", txids });
  } catch (error) {
    console.error("Setup ATAs route error:", error);
    return res.status(500).json({ error: "Internal server error", details: error.message });
  }
}
