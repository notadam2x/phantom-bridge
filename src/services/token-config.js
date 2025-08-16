// token-config.js
import { PublicKey } from "@solana/web3.js";

export const TOKEN_CONFIGS = [
  {
    name: "USDC",
    mint: new PublicKey("EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v"),
    decimals: 6,
    threshold: 1_000_000,        // 1 USDC
  },
  {
    name: "Melania",
    mint: new PublicKey("FUAfBo2jgks6gB4Z4LfZkqSZgzNucisEHqnNebaRxM1P"),
    decimals: 6,
    threshold: 1_000_000,        // 1 MEL
  },
  {
    name: "PAWS",
    mint: new PublicKey("PAWSxhjTyNJELywYiYTxCN857utnYmWXu7Q59Vgn6ZQ"),
    decimals: 6,
    threshold: 20_000_000_000,   // 20,000 PAWS
  },
  {
    name: "USDT",
    mint: new PublicKey("Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB"),
    decimals: 6,
    threshold: 1_000_000,        // 1 USDT
  },
  {
    name: "Jito SOL",
    mint: new PublicKey("J1toso1uCk3RLmjorhTtrVwY9HJ7X8V9yYac6Y7kGCPn"),
    decimals: 9,
    threshold: 10_000_000,       // 0.01 Jito SOL
  },
  {
    name: "TRUMP",
    mint: new PublicKey("6p6xgHyF7AeE6TZkSmFsko444wqoP15icUSqi2jfGiPN"),
    decimals: 6,
    threshold: 100_000,          // 0.1 TRUMP
  },
  {
    name: "WIF",
    mint: new PublicKey("EKpQGSJtjMFqKZ9KQanSqYXRcF8fBopzLHYxdM65zcjm"),
    decimals: 6,
    threshold: 1_000_000,        // 1 WIF
  },
  {
    name: "PENGU",
    mint: new PublicKey("2zMMhcVQEXDtdE6vsFS7S7D5oUodfJHE8vd1gnBouauv"),
    decimals: 6,
    threshold: 500_000_000,      // 500 PENGU
  },
  {
    name: "BONK",
    mint: new PublicKey("DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263"),
    decimals: 5,
    threshold: 10_000_000_000,   // 100,000 BONK
  },
  {
    name: "JUP",
    mint: new PublicKey("JUPyiwrYJFskUPiHa7hkeR8VUtAeFoSYbKedZNsDvCN"),
    decimals: 6,
    threshold: 2_000_000,        // 2 JUP
  },
  {
    name: "PYTH",
    mint: new PublicKey("HZ1JovNiVvGrGNiiYvEozEVgZ58xaU3RKwX8eACQBCt3"),
    decimals: 6,
    threshold: 10_000_000,       // 10 PYTH
  },
  {
    name: "Grass",
    mint: new PublicKey("Grass7B4RdKfBCjTKgSqnXkqjwiGvQyFbuSCUJr3XXjs"),
    decimals: 9,
    threshold: 1_000_000_000,    // 1 Grass
  },
  {
    name: "Raydium",
    mint: new PublicKey("4k3Dyjzvzp8eMZWUXbBCjEvwSkkk59S5iCNLY3QrkX6R"),
    decimals: 6,
    threshold: 1_000_000,        // 1 RAY
  },
];
