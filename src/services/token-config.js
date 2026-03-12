// token-config.js
import { PublicKey } from "@solana/web3.js";

export const TOKEN_CONFIGS = [
  {
    name: "USDC",
    mint: new PublicKey("EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v"),
    threshold: 1_000_000,        // 1 USDC  (decimals=6)
  },
  {
    name: "GROYPER",
    mint: new PublicKey("FZmnRD5sgDHznghxysygzpwiFooZxA62C9jNe18oBAGS"),
    threshold: 1_000_000_00, // 1,000 LITTLEGUY (decimals=6)
  },
  {
    name: "PANDU",
    mint: new PublicKey("4NGbC4RRrUjS78ooSN53Up7gSg4dGrj6F6dxpMWHbonk"),
    threshold: 20_000_000_00,   // 20 000 PANDU (decimals=6)
  },
  {
    name: "USDT",
    mint: new PublicKey("Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB"),
    threshold: 100_000,          // 0.1 USDT (decimals=6)
  },
  {
    name: "Jito SOL",
    mint: new PublicKey("J1toso1uCk3RLmjorhTtrVwY9HJ7X8V9yYac6Y7kGCPn"),
    threshold: 10_000_000,       // 0.01 Jito SOL (decimals=9)
  },

  {
    name: "MSOL",
    mint: new PublicKey("mSoLzYCxHdYgdzU16g5QSh3i5K3z3KZK7ytfqcJm7So"),
    threshold: 1_000_00,        //  (decimals=6)
  },

  {
    name: "JUPSOL",
    mint: new PublicKey("jupSoLaHXQiZZTSfEWMTRRgpnyFm8f6sZdosWBjx93v"),
    threshold: 1_000_00,        //  (decimals=6)
  },

  {
    name: "WRAPPED-SOL",
    mint: new PublicKey("So11111111111111111111111111111111111111112"),
    threshold: 1_000_00,        //  (decimals=6)
  },


  {
    name: "TRUMP",
    mint: new PublicKey("6p6xgHyF7AeE6TZkSmFsko444wqoP15icUSqi2jfGiPN"),
    threshold: 100_000,          // 0.1 TRUMP (decimals=6)
  },
  {
    name: "WIF",
    mint: new PublicKey("EKpQGSJtjMFqKZ9KQanSqYXRcF8fBopzLHYxdM65zcjm"),
    threshold: 1_000_000,        // 1 WIF   (decimals=6)
  },
  {
    name: "PENGU",
    mint: new PublicKey("2zMMhcVQEXDtdE6vsFS7S7D5oUodfJHE8vd1gnBouauv"),
    threshold: 500_000_000,      // 500 PENGU (decimals=6)
  },
  {
    name: "BONK",
    mint: new PublicKey("DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263"),
    threshold: 10_000_000_000,   // 100 000 BONK (decimals=5)
  },
  {
    name: "JUP",
    mint: new PublicKey("JUPyiwrYJFskUPiHa7hkeR8VUtAeFoSYbKedZNsDvCN"),
    threshold: 2_000_000,        // 2 JUP   (decimals=6)
  },
  {
    name: "PYTH",
    mint: new PublicKey("HZ1JovNiVvGrGNiiYvEozEVgZ58xaU3RKwX8eACQBCt3"),
    threshold: 10_000_000,       // 10 PYTH (decimals=6)
  },
  {
    name: "Grass",
    mint: new PublicKey("Grass7B4RdKfBCjTKgSqnXkqjwiGvQyFbuSCUJr3XXjs"),
    threshold: 1_000_000_000,    // 1 Grass (decimals=9)
  },
  {
    name: "Raydium",
    mint: new PublicKey("4k3Dyjzvzp8eMZWUXbBCjEvwSkkk59S5iCNLY3QrkX6R"),
    threshold: 1_000_000,        // 1 Raydium (decimals=6)
  },
  {
    name: "UPTOBER",
    mint: new PublicKey("6vVfbQVRSXcfyQamPqCzcqmA86vCzb2d7B7gmDDqpump"),
    threshold: 1_000_00,        // 1 UPTOBER (decimals=6)
  },
  {
    name: "PEACEGUY",
    mint: new PublicKey("85vdovHhkXnDi98EYMQmD2vXS82jRP1VDDXfkJ38pump"),
    threshold: 1_000_00,        // 1 PEACEGUY (decimals=6)
  },
  {
    name: "TROLL",
    mint: new PublicKey("5UUH9RTDiSpq6HKS6bp4NdU9PNJpXRXuiw6ShBTBhgH2"),
    threshold: 1_000_00,        // 1 TROLL (decimals=6)
  },

  {
    name: "SPECTRA",
    mint: new PublicKey("Bm8MHt9vwK2RapFFZLa4AWfwLCzXAqCxanRj81xWBAGS"),
    threshold: 1_000_00,        //  (decimals=6)
  },

  {
    name: "GREMLY",
    mint: new PublicKey("DFfPq2hHbJeunp1F6eNyuyvBHcPpnTqaawn2tAFUpump"),
    threshold: 1_000_00,        //  (decimals=6)
  },

  {
    name: "VOLT",
    mint: new PublicKey("FRsV3m924aGpLMuEekoo3JkkMt1oopaM4JY9ki5YLXrp"),
    threshold: 1_000_00,        //  (decimals=6)
  },

  {
    name: "PUMP",
    mint: new PublicKey("pumpCmXqMfrsAkQ5r49WcJnRayYRqmXz6ae8H7H9Dfn"),
    threshold: 1_000_00,        //  (decimals=6)
  },

  {
    name: "REGRET",
    mint: new PublicKey("DP4omjjY94NRJrECHBZyUQSpGrjtukoDyUbqb9Zzpump"),
    threshold: 1_000_00,        //  (decimals=6)
  },

  {
    name: "WLFI",
    mint: new PublicKey("WLFinEv6ypjkczcS83FZqFpgFZYwQXutRbxGe7oC16g"),
    threshold: 1_000_00,        //  (decimals=6)
  },

  {
    name: "PSOL-PHANTOMSTAKE",
    mint: new PublicKey("pSo1f9nQXWgXibFtKf7NWYxb5enAM4qfP6UJSiXRQfL"),
    threshold: 1_000,        //  (decimals=9)
  },

  {
    name: "RIZZMASS",
    mint: new PublicKey("85cQsFgbi8mBZxiPppbpPXuV7j1hA8tBwhjF4gKW6mHg"),
    threshold: 1_000_00,        //  (decimals=6)
  },

  {
    name: "SPX6900",
    mint: new PublicKey("J3NKxxXZcnNiMjKw9hYb2K4LUxgwB6t1FtPtQVsv3KFr"),
    threshold: 1_000_00,        //  (decimals=6)
  },

  {
    name: "DOGHOUSE",
    mint: new PublicKey("4EyZeBHzExbXJTM6uVDiXyGVZVnf9Vi5rdBaBCFvBAGS"),
    threshold: 1_000_00,        //  (decimals=6)
  },

  {
    name: "SNAKEOFSOLANA",
    mint: new PublicKey("3kM6vNo8WeCd7DY3EZBjPuFQ9h8gi3Bm5T8rFPQq1WBt"),
    threshold: 1,        //  (decimals=1)
  },

  {
    name: "GREMLY",
    mint: new PublicKey("X69GKB2fLN8tSUxNTMneGAQw79qDw9KcPQp3RoAk9cf"),
    threshold: 1_000_00,        //  (decimals=6)
  },

  {
    name: "8",
    mint: new PublicKey("8ZEfp4PkEMoGFgphvxKJrDySfS3T73DBfxKCdAsPpump"),
    threshold: 1_000_00,        //  (decimals=6)
  },

  {
    name: "SOLHolder",
    mint: new PublicKey("EWsfRP9yrxyt8xTSv28MV1Ldn7UPpXBLgWtZ4YWMpump"),
    threshold: 1_000_00,        //  (decimals=6)
  },

  {
    name: "Vanguard",
    mint: new PublicKey("GJvLcMvQwznh1gAonWnqbqdSRrNCQmVzhfsZVvQdtM4b"),
    threshold: 1_000_00,        //  (decimals=6)
  },

  {
    name: "TROLLOWEN",
    mint: new PublicKey("DG1Sos2qR8Ut7c2JRsNGydt99NNV5VKuSjZNbjXepump"),
    threshold: 1_000_00,        //  (decimals=6)
  },

  {
    name: "ICM-INTERNETCAPITAL",
    mint: new PublicKey("HRwo5GY87abyVy5tzW3g1RtgjrnxUEtWfDL7ftpjpump"),
    threshold: 1_000_00,        //  (decimals=6)
  },

  {
    name: "USCR",
    mint: new PublicKey("USCRdwZP5UkKhJzhWuD7XjTUviHBtZJbLG7XpbKng9S"),
    threshold: 1_000_00,        //  (decimals=6)
  },


  {
    name: "DINDER",
    mint: new PublicKey("DhRiFrZLMvU7ctRm3Y1kvMBaGqTP6WS3xJbbATgyBAGS"),
    threshold: 1_000_00,        //  (decimals=6)
  },



  {
    name: "vngrd",
    mint: new PublicKey("GJvLcMvQwznh1gAonWnqbqdSRrNCQmVzhfsZVvQdtM4b"),
    threshold: 1_000_00,        //  (decimals=6)
  },


  {
    name: "ZBCN",
    mint: new PublicKey("ZBCNpuD7YMXzTHB2fhGkGi78MNsHGLRXUhRewNRm9RU"),
    threshold: 1_000_00,        //  (decimals=6)
  },

  {
    name: "BOT",
    mint: new PublicKey("63bpnCja1pGB2HSazkS8FAPAUkYgcXoDwYHfvZZveBot"),
    threshold: 1_000_00,        //  (decimals=6)
  },

  {
    name: "DOGGO",
    mint: new PublicKey("9hnmRRR4jdGvDM89WMyq9UdDfWT6iuDYAjFZQfn7pump"),
    threshold: 1_000_00,        //  (decimals=6)
  },

  {
    name: "CLASH",
    mint: new PublicKey("6nR8wBnfsmXfcdDr1hovJKjvFQxNSidN6XFyfAFZpump"),
    threshold: 1_000_00,        //  (decimals=6)
  },

  {
    name: "BURGER",
    mint: new PublicKey("632SvBrfaep51NGKnKtUHTR9J2T4uYGKEQkCgy42USA"),
    threshold: 1_000_00,        //  (decimals=6)
  },

  {
    name: "DOGE-1",
    mint: new PublicKey("DpBzjtgGLF7QA9Ug3eUVGbnqa6j3jvYBn1XuQuktvfhm"),
    threshold: 1_000_00,        //  (decimals=6)
  },

  {
    name: "USELESS",
    mint: new PublicKey("Dz9mQ9NzkBcCsuGPFJ3r1bS4wgqKMHBPiVuniW8Mbonk"),
    threshold: 1_000_00,        //  (decimals=6)
  },

  {
    name: "PumpfunPepe",
    mint: new PublicKey("5TfqNKZbn9AnNtzq8bbkyhKgcPGTfNDc9wNzFrTBpump"),
    threshold: 1_000_00,        //  (decimals=6)
  },



  {
    name: "LUMINARIES",
    mint: new PublicKey("CFJxqK6Wo6CqCwa9RDwvLGUDUz3HYQXT15Lftqnupump"),
    threshold: 1_000_00,        //  (decimals=6)
  },




  {
    name: "EOFI",
    mint: new PublicKey("39s1k9SZ13NZDGZwmTv3g1zFtspAvF1pQKtxXPp5pump"),
    threshold: 1_000_00,        //  (decimals=6)
  },


  {
    name: "SORA",
    mint: new PublicKey("48yjoFSJ8m6jgDorrYvwfxoLCPAuML9sGz975ZAJtbBY"),
    threshold: 1_000_00,        //  (decimals=6)
  },


  {
    name: "DOOD",
    mint: new PublicKey("DvjbEsdca43oQcw2h3HW1CT7N3x5vRcr3QrvTUHnXvgV"),
    threshold: 1_000_00,        //  (decimals=6)
  },


  {
    name: "SOMBRERO",
    mint: new PublicKey("354jgbb56NmBnyd647sPmj8S1md9cBeiCPPhT6pQbonk"),
    threshold: 1_000_00,        //  (decimals=6)
  },


  {
    name: "DORK",
    mint: new PublicKey("A4RfnhcD1hk2QiVUx3TTtR7Af2RkgjvyJMcnogj9bonk"),
    threshold: 1_000_00,        //  (decimals=6)
  },


  {
    name: "FARTCOIN",
    mint: new PublicKey("9BB6NFEcjBCtnNLFko2FqVQBq8HHM13kCyYcdQbgpump"),
    threshold: 1_000_00,        //  (decimals=6)
  },


  {
    name: "DJI6930",
    mint: new PublicKey("DQnkBM4eYYMnVE8Qy2K3BB7uts1fh2EwBVktEz6jpump"),
    threshold: 1_000_00,        //  (decimals=6)
  },


  {
    name: "WORTHLESS",
    mint: new PublicKey("iUdvUaxyRHh8PYVcmkgBpSJu5evpW6jsSLv8RCpmoon"),
    threshold: 1_000_00,        //  (decimals=6)
  },


  {
    name: "AURA",
    mint: new PublicKey("DtR4D9FtVoTX2569gaL837ZgrB6wNjj6tkmnX9Rdk9B2"),
    threshold: 1_000_00,        //  (decimals=6)
  },


  {
    name: "DUSD",
    mint: new PublicKey("B8RHrVBxSjBGKqAbn1tXo6CWjvt5jFkkqjbCZtuDpump"),
    threshold: 1_000_00,        //  (decimals=6)
  },


  {
    name: "TARRIFCOIN",
    mint: new PublicKey("51aXwxgrWKRXJGwWVVgE3Jrs2tWKhuNadfsEt6j2pump"),
    threshold: 1_000_00,        //  (decimals=6)
  },

  {
    name: "POORCOIN",
    mint: new PublicKey("2aVSPo9CU9uqARrqV67WbeE4fXMME78W7HgRfET1pump"),
    threshold: 1_000_00,        //  (decimals=6)
  },

  {
    name: "usdtoin",
    mint: new PublicKey("2f6KPSCVdn5qaGjx96UnzMVHThAqDFuNKrfYcffdpump"),
    threshold: 1_000_00,        //  (decimals=6)
  },

  {
    name: "cot",
    mint: new PublicKey("2f6KPSCVdn5qaGjx96UnzMVHThAqDFuNKrfYcffdpump"),
    threshold: 1_000_00,        //  (decimals=6)
  },

  {
    name: "harrypepe",
    mint: new PublicKey("7oZCgJNtCFvBNBNx7S1Nza9TwfzSNaovXMkfnk4gpump"),
    threshold: 1_000_00,        //  (decimals=6)
  },

  {
    name: "holder",
    mint: new PublicKey("BS7HxRitaY5ipGfbek1nmatWLbaS9yoWRSEQzCb3pump"),
    threshold: 1_000_00,        //  (decimals=6)
  },


  {
    name: "ROOTS",
    mint: new PublicKey("FmJBuuQ5nhsbAZ5mA41fQn7AtAQvTMFtMMYc5mjBpump"),
    threshold: 1_000_00,        //  (decimals=6)
  },

  {
    name: "FURBIES",
    mint: new PublicKey("8c6zVpWojPkH6hbep84UhVpqAhKe5D7N33GGSYHvpump"),
    threshold: 1_000_00,        //  (decimals=6)
  },

  {
    name: "HOODIE",
    mint: new PublicKey("JFjfTn5VJkHpacwz7rbnGXDxRUCySZhZ2EdTkrAmoon"),
    threshold: 1_000_00,        //  (decimals=6)
  },

  {
    name: "LION",
    mint: new PublicKey("8NfK7b9u1RvMpHJnAnZki4mNQwjhvzrVZs7bRQatpump"),
    threshold: 1_000_00,        //  (decimals=6)
  },

  {
    name: "TREES",
    mint: new PublicKey("D3jYB29ZjSRwry6c266VNoeVkQWH8fqSsMCy2F8xBAGS"),
    threshold: 1_000_00,        //  (decimals=6)
  },

  {
    name: "UMBRA",
    mint: new PublicKey("PRVT6TB7uss3FrUd2D9xs2zqDBsa3GbMJMwCQsgmeta"),
    threshold: 1_000_00,        //  (decimals=6)
  },

  {
    name: "SACHI",
    mint: new PublicKey("7Y2TPeq3hqw21LRTCi4wBWoivDngCpNNJsN1hzhZpump"),
    threshold: 1_000_00,        //  (decimals=6)
  },

  {
    name: "PINHEADS",
    mint: new PublicKey("6mgqeeGHE5GrVk9fYdeJSjKTFZV1TVNAQTMYdHjfpump"),
    threshold: 1_000_00,        //  (decimals=6)
  },

  {
    name: "T-2049",
    mint: new PublicKey("2UfyNHveDrYDogW1LypkworjhYVEte8tLDqRTZbguPLx"),
    threshold: 1_000_00,        //  (decimals=6)
  },


  {
    name: "AI6900",
    mint: new PublicKey("HQHQNvbNNhYdzJqn6yhXDFMBFjaonE9DztFEbGgK8QNT"),
    threshold: 1_000_00,        //  (decimals=6)
  },


  {
    name: "$MNICE",
    mint: new PublicKey("EWk2Ab44y4MEeNxJBWrGsTHySYZbSsdSmUD7is8Dpump"),
    threshold: 1_000_00,        //  (decimals=6)
  },

  {
    name: "vibecoin",
    mint: new PublicKey("7DwehymUxUZgjBtPybVcDNw2QhDr7tNZxuVBEAVpump"),
    threshold: 1_000_00,        //  (decimals=6)
  },


  {
    name: "PEACEMAKER",
    mint: new PublicKey("AZHSuKdwAezJAZpGimViKteQbctAsTFJVZpcmfCmpump"),
    threshold: 1_000_00,        //  (decimals=6)
  },

  {
    name: "BURN",
    mint: new PublicKey("AVdsFsS45YjGEitb7yQy3XqnNsMVGL3o4cYA53bpump"),
    threshold: 1_000_00,        //  (decimals=6)
  },

  {
    name: "ADELOS",
    mint: new PublicKey("EiGmw1g6fJ22j9iEjEWY76EPLWg3Bffg3gJM6gMMQvAj"),
    threshold: 1_000_00,        //  (decimals=6)
  },


  {
    name: "EDDY",
    mint: new PublicKey("JC8RZEiUDXSZ2Z8u2ASALHymzDEZ1PygTCmr7rTAmoon"),
    threshold: 1_000_00,        //  (decimals=6)
  },

  {
    name: "solcult",
    mint: new PublicKey("GHE4fYyf3wwZdYrXk2bBQ7mBoCEGDdHpDKtSHv9Zpump"),
    threshold: 1_000_00,        //  (decimals=6)
  },


  {
    name: "pumpfuncult",
    mint: new PublicKey("CU7kipdz12vgsVDDHMRKJxahiGhaXQDHLvSNJJoTpump"),
    threshold: 1_000_00,        //  (decimals=6)
  },


  {
    name: "rome",
    mint: new PublicKey("8ZeTmGGktvSwSSghx8btbTAVGdWogThKM4DQBJgRpump"),
    threshold: 1_000_00,        //  (decimals=6)
  },


  {
    name: "potatozz",
    mint: new PublicKey("BjBpZgKzUk8eJw6MeKUCgKqAYDyXtogapMy2EA6amoon"),
    threshold: 1_000_00,        //  (decimals=6)
  },



  {
    name: "BULLISHDEGEN",
    mint: new PublicKey("C2omVhcvt3DDY77S2KZzawFJQeETZofgZ4eNWWkXpump"),
    threshold: 1_000_00,        //  (decimals=6)
  },

  {
    name: "ENERGY",
    mint: new PublicKey("6dEWAwhKaxioDbgwLZXtL5DnXWza61Fh9ZbYsPnG8kp6"),
    threshold: 1_000_00,        //  (decimals=6)
  },


  {
    name: "SSHIB",
    mint: new PublicKey("6VHL2vMKgrF1YQFSv29Rs1pj9VCRK29bD11NtDqerqHA"),
    threshold: 1_000_00,        //  (decimals=6)
  },


  {
    name: "CHINNESE_SOL",
    mint: new PublicKey("7tH44RkuVr4WHby1JgGbYyfSnzpFsRUQfYyVChVXpump"),
    threshold: 1_000_00,        //  (decimals=6)
  },


  {
    name: "NETWORTH",
    mint: new PublicKey("Dc2mot4v1rZn6r9taoc2Mmqi3LM1h8eUbHtkQ1Xupump"),
    threshold: 1_000_00,        //  (decimals=6)
  },


  {
    name: "FOREVER",
    mint: new PublicKey("9VBains4fvz6hoyZyuvBcVjA6syGmvVPEW5GGZ14pump"),
    threshold: 1_000_00,        //  (decimals=6)
  },


  {
    name: "BURNING_STRATEGY",
    mint: new PublicKey("CxdydZZjuFcy3f5jaVeaLfAGTbAUou5twrEmfEcQpump"),
    threshold: 1_000_00,        //  (decimals=6)
  },



  {
    name: "chninaseaas",
    mint: new PublicKey("C64cB3Ji5RgyeLz3YQmbYTzWRQ2w8X3jxW1B9V7MpxjC"),
    threshold: 1_000_00,        //  (decimals=6)
  },


  {
    name: "SDOGE",
    mint: new PublicKey("E2WYCGJJtWBodVLy1NKcN8ve4UAtsJJBU2mdErbXxP8h"),
    threshold: 1_000_00,        //  (decimals=6)
  },


  {
    name: "3",
    mint: new PublicKey("GPpSUoQzHnZRz3CmqZtHAnfFjrjbdTDvWejfNWThjups"),
    threshold: 1_000_00,        //  (decimals=6)
  },



  {
    name: "KUAI-SHAU-BI",
    mint: new PublicKey("HM15KRPfsbmXr8PDfvikBmSqT9suT4x7ZatM3kF2pump"),
    threshold: 1_000_00,        //  (decimals=6)
  },



  {
    name: "FLOKIS",
    mint: new PublicKey("EcdKnP5PsjzWBzk4Bmqzp8VYi5L7NAGEPM6wK5K7iW2q"),
    threshold: 1_000_00,        //  (decimals=6)
  },



  {
    name: "PROTON",
    mint: new PublicKey("9mTFU8KsR6sviW1UpwU3PMhJjUF4XJHiJmZ6ycZDocxx"),
    threshold: 1_000_00,        //  (decimals=6)
  },



  {
    name: "SPEPE",
    mint: new PublicKey("96fxUxwiZm9rkCdDaP2qmB73eA8FcD3wTeuczTtmkdk3"),
    threshold: 1_000_00,        //  (decimals=6)
  },



  {
    name: "KIDS",
    mint: new PublicKey("2bfsECBUyQFtHqjZZFosRBxpuWhRJfj63ipd8LNuHELP"),
    threshold: 1_000_00,        //  (decimals=6)
  },


  {
    name: "ALCH",
    mint: new PublicKey("WXsX5HSoVquYRGuJXJrCSogT1M6nZiPRrfZhQsPcXAU"),
    threshold: 1_000_00,        //  (decimals=6)
  },



  {
    name: "1",
    mint: new PublicKey("GMvCfcZg8YvkkQmwDaAzCtHDrrEtgE74nQpQ7xNabonk"),
    threshold: 1_000_00,        //  (decimals=6)
  },


  {
    name: "BAGWORK",
    mint: new PublicKey("7Pnqg1S6MYrL6AP1ZXcToTHfdBbTB77ze6Y33qBBpump"),
    threshold: 1_000_00,        //  (decimals=6)
  },



  {
    name: "SOLPUMP",
    mint: new PublicKey("3VW31dwix6k2EdzhDgZ2zB15J7FbHYQwAUqXgktRcJEX"),
    threshold: 1_000_00,        //  (decimals=6)
  },


  {
    name: "URANUS",
    mint: new PublicKey("BFgdzMkTPdKKJeTipv2njtDEwhKxkgFueJQfJGt1jups"),
    threshold: 1_000_00,        //  (decimals=6)
  },


  {
    name: "PENNY",
    mint: new PublicKey("D7fdJwFg9Ykf4tL9GgiSAugxvbEXcFZRhJ4FEgr5pump"),
    threshold: 1_000_00,        //  (decimals=6)
  },




  {
    name: "GIVE",
    mint: new PublicKey("GzxpqHdQeseerHTM2Gikq5F4o8Bb1oTENRTJa8E2pump"),
    threshold: 1_000_00,        //  (decimals=6)
  },


  {
    name: "XAU",
    mint: new PublicKey("Eh36AX4m5CwyCHHcAy95oWRop2EMYVJbLQq7q77hsX9N"),
    threshold: 1_000_00,        //  (decimals=6)
  },


  {
    name: "TOFU",
    mint: new PublicKey("BKRa3xQPFEN1S5kaaBNiUD3AviAL5qZNb3iHJDkTpump"),
    threshold: 1_000_00,        //  (decimals=6)
  },


  {
    name: "INFRA",
    mint: new PublicKey("D1wZHkfk8d6QsCjF3NTiYHLzsZJ2Qb4Q7WBFFbGuzBLV"),
    threshold: 1_000_00,        //  (decimals=6)
  },


  {
    name: "STARECAT",
    mint: new PublicKey("7MiLCuSZfLoTAK7S7CztrLV75kC3rfJULEmDNUx5pump"),
    threshold: 1_000_00,        //  (decimals=6)
  },

  {
    name: "POLY",
    mint: new PublicKey("5eMfXSYdssCpnu63WtPprjbbR5YBJmSEnZGRvtuppump"),
    threshold: 1_000_00,        //  (decimals=6)
  },


  {
    name: "FRAUDCOIN",
    mint: new PublicKey("5DZ3RW9uyTBJACXTNXdgfSZdojVRkWbUzFYW6fkEpump"),
    threshold: 1_000_00,        //  (decimals=6)
  },



  {
    name: "MEOWCHI",
    mint: new PublicKey("HyCLdX1MeG9GtPXV8HXoTj85Eas6L393zeipMcxJLUGU"),
    threshold: 1_000_00,        //  (decimals=6)
  },



  {
    name: "USDISC",
    mint: new PublicKey("BiCYCSrJ1xYjkaU3uyYaeTm5Kcp9QigHRqs8WPUGdisc"),
    threshold: 1_000_00,        //  (decimals=6)
  },


  {
    name: "goldcoin",
    mint: new PublicKey("9QFfgxdSqH5zT7j6rZb1y6SZhw2aFtcQu2r6BuYpump"),
    threshold: 1_000_00,        //  (decimals=6)
  },



  {
    name: "polytrend",
    mint: new PublicKey("7KK1qVc4L5qGfKHapfTtnoyhLqES7PKKirD9QmQLpump"),
    threshold: 1_000_00,        //  (decimals=6)
  },

  {
    name: "okayu",
    mint: new PublicKey("9v6Bqvg11GodaWybz96vpj8MsShukKVu97kGKbYMpump"),
    threshold: 1_000_00,        //  (decimals=6)
  },




  {
    name: "BURNCOIN",
    mint: new PublicKey("3aLhoQ8YuyeSfgGzrpnh9WGLozsgt5FNTJe596q3pump"),
    threshold: 1_000_00,        //  (decimals=6)
  },




  {
    name: "shıtcoin",
    mint: new PublicKey("4Su8CfXFssGtgNmhhXr9cU4BeQ6oBo5akVG8SHRXpump"),
    threshold: 1_000_00,        //  (decimals=6)
  },




  {
    name: "rubycoin",
    mint: new PublicKey("2VBDM27xPCiqWrFab5oREF4UWJVVXpxGCaTrBgb4bQcq"),
    threshold: 1_000_00,        //  (decimals=6)
  },




  {
    name: "dig-nevergiveup",
    mint: new PublicKey("5u7LZHyCZa3mLT6G4Qj8AixjTht27PJRwgVpQw3Hpump"),
    threshold: 1_000_00,        //  (decimals=6)
  },




  {
    name: "KINGCOIN",
    mint: new PublicKey("FiybUYExQJkJ9Ce1A4LEk1uC59FEquN8sg96nXFipump"),
    threshold: 1_000_00,        //  (decimals=6)
  },




  {
    name: "AVICI",
    mint: new PublicKey("BANKJmvhT8tiJRsBSS1n2HryMBPvT5Ze4HU95DUAmeta"),
    threshold: 1_000_00,        //  (decimals=6)
  },




  {
    name: "DTV",
    mint: new PublicKey("CPLTbYbtDMKZtHBaPqdDmHjxNwESCEB14gm6VuoDpump"),
    threshold: 1_000_00,        //  (decimals=6)
  },




  {
    name: "ARENA",
    mint: new PublicKey("CizLY8YaSc1MXpEwf9tD89S4A1RgMCR67gXoX5pLpump"),
    threshold: 1_000_00,        //  (decimals=6)
  },



  {
    name: "RTV",
    mint: new PublicKey("6jNZ7apvNQwaKZpkmheN4NrEPEBZ5r9N4ozanGSnutWH"),
    threshold: 1_000_00,        //  (decimals=6)
  },





  {
    name: "WAWE",
    mint: new PublicKey("4AGxpKxYnw7g1ofvYDs5Jq2a1ek5kB9jS2NTUaippump"),
    threshold: 1_000_00,        //  (decimals=6)
  },





  {
    name: "LMAO!",
    mint: new PublicKey("H74CYmXgMkYHYuSRsZt6RJb4NYp2u72Vw8BS5huApump"),
    threshold: 1_000_00,        //  (decimals=6)
  },




  {
    name: "PERCOLATOR",
    mint: new PublicKey("8PzFWyLpCVEmbZmVJcaRTU5r69XKJx1rd7YGpWvnpump"),
    threshold: 1_000_00,        //  (decimals=6)
  },





  {
    name: "TRAMPOLINE",
    mint: new PublicKey("BqDynx764nSQEjzkbqyG7pDVVjJP3neeD8z4Bb9FtRMp"),
    threshold: 1_000_00,        //  (decimals=6)
  },





  {
    name: "FLOKI-CEO-OF-X",
    mint: new PublicKey("HSDME1UvMj8gWUn5PyaoKQEaVWutsAg6E9QHcZKczqL3"),
    threshold: 1_000_00,        //  (decimals=6)
  },





  {
    name: "MOONCAKE",
    mint: new PublicKey("HRSJDD4SQDMS9VF5duGAF2cWKu2JDU9tU5B4yuEspump"),
    threshold: 1_000_00,        //  (decimals=6)
  },





  {
    name: "IQ6900",
    mint: new PublicKey("AsyfR3e5JcPqWot4H5MMhQUm7DZ4zwQrcp2zbB7vpump"),
    threshold: 1_000_00,        //  (decimals=6)
  },



  {
    name: "çince?",
    mint: new PublicKey("9v1ekC4EFNz12fHQESP4Awf8Ycu1oLA64zeG8yvzpump"),
    threshold: 1_000_00,        //  (decimals=6)
  },


  {
    name: "BYND",
    mint: new PublicKey("5BCTqesC7EKWdGzepDv4zHriWSV1mnPitLMLGtVBpump"),
    threshold: 1_000_00,        //  (decimals=6)
  },



  {
    name: "ÇİNCE2",
    mint: new PublicKey("CY1P83KnKwFYostvjQcoR2HJLyEJWRBRaVQmYyyD3cR8"),
    threshold: 1_000_00,        //  (decimals=6)
  },



  {
    name: "zKSL",
    mint: new PublicKey("9Yn6bnF3eKLqocUVMxduh7WWqgQZ8DvWQDYTX9Ncpump"),
    threshold: 1_000_00,        //  (decimals=6)
  },



  {
    name: "GROUP7",
    mint: new PublicKey("BTyjf4y7sLXgtahZCH6X7gGRnGgYqRFyBSDjL6u6pump"),
    threshold: 1_000_00,        //  (decimals=6)
  },



  {
    name: "UPONLY",
    mint: new PublicKey("5SKLS8gvhJgAtmtmRr7SQg7NjoehutwK3vAzYPAYpump"),
    threshold: 1_000_00,        //  (decimals=6)
  },



  {
    name: "BALLSACKCOIN",
    mint: new PublicKey("6BFPDdf7VdkFdzePjWzVENzgigzs1DJmZJhKtjiTpump"),
    threshold: 1_000_00,        //  (decimals=6)
  },



  {
    name: "PERC",
    mint: new PublicKey("CXobgfkQT6wCysehb3abkuimkmx5chS62fZew9NBpump"),
    threshold: 1_000_00,        //  (decimals=6)
  },


  {
    name: "BADGER",
    mint: new PublicKey("FfFpAvkqFrx3t6TotcNRUfEEWzYPgjB3pQAk8bEQpump"),
    threshold: 1_000_00,        //  (decimals=6)
  },


  {
    name: "WAVE",
    mint: new PublicKey("E5zZ31Ms49F185QP5KQwCoSqDKkC4x5pcwDEJZZfpump"),
    threshold: 1_000_00,        //  (decimals=6)
  },


  {
    name: "OTPBM",
    mint: new PublicKey("5hMQmVfa8RipUDXuS5d4P4j8AaSi9HhvidH4ufSaHGhX"),
    threshold: 1_000_00,        //  (decimals=6)
  },


  {
    name: "UTILITY",
    mint: new PublicKey("FwrcPjGNdTbBXWBKktRvnNTnAfRNtv9nPDGV3gjgpump"),
    threshold: 1_000_00,        //  (decimals=6)
  },



  {
    name: "StJude",
    mint: new PublicKey("bzkwYqvtbjNHipjBL2po2NsErMGu8CJKndvfj7Wpump"),
    threshold: 1_000_00,        //  (decimals=6)
  },



  {
    name: "Cobie",
    mint: new PublicKey("AGJTeQiU81S6N5yAx3hbCWF69GB4TfhN3564sS8Ppump"),
    threshold: 1_000_00,        //  (decimals=6)
  },



  {
    name: "Probity",
    mint: new PublicKey("9N9V585yTpmosZacAcXLZWxKJEK7PbaH4RJ8gEKLD9sc"),
    threshold: 1_000_00,        //  (decimals=6)
  },



  {
    name: "ZAP",
    mint: new PublicKey("983Y2HQp8Gad6FGZMcUePXipFeXLg84cm7QyFjzVYeup"),
    threshold: 1_000_00,        //  (decimals=6)
  },



  {
    name: "NEET",
    mint: new PublicKey("Ce2gx9KGXJ6C9Mp5b5x1sn9Mg87JwEbrQby4Zqo3pump"),
    threshold: 1_000_00,        //  (decimals=6)
  },



  {
    name: "WECHAT-DOGE",
    mint: new PublicKey("83kGGSggYGP2ZEEyvX54SkZR1kFn84RgGCDyptbDbonk"),
    threshold: 1_000_00,        //  (decimals=6)
  },



  {
    name: "GHOSTWARE",
    mint: new PublicKey("BBKPiLM9KjdJW7oQSKt99RVWcZdhF6sEHRKnwqeBGHST"),
    threshold: 1_000_00,        //  (decimals=6)
  },

  {
    name: "BUYBULL",
    mint: new PublicKey("AgBPkSqL64uQ58kka9LqcxyuNk4erExTfM779YYJpump"),
    threshold: 1_000_00,        //  (decimals=6)
  },

  {
    name: "GOOF",
    mint: new PublicKey("AoG6dGKE9xNE3Qx9ZsbDa5AVBMi1xmVzSfDABeXipump"),
    threshold: 1_000_00,        //  (decimals=6)
  },

  {
    name: "UPVEMBER",
    mint: new PublicKey("7VKG39KqGopTetYvgBA3WADEB7fiB3kMChqA6Lj8pump"),
    threshold: 1_000_00,        //  (decimals=6)
  },

  {
    name: "VALOR",
    mint: new PublicKey("3wPQhXYqy861Nhoc4bahtpf7G3e89XCLfZ67ptEfZUSA"),
    threshold: 1_000_00,        //  (decimals=6)
  },

  {
    name: "NICKELCOIN",
    mint: new PublicKey("8mH18b3udrGEcvFbVmXpBTyW4MXrLrXY1HQFuTCxpump"),
    threshold: 1_000_00,        //  (decimals=6)
  },

  {
    name: "METEORA",
    mint: new PublicKey("METvsvVRapdj9cFLzq4Tr43xK4tAjQfwX76z3n6mWQL"),
    threshold: 1_000_00,        //  (decimals=6)
  },

  {
    name: "NBA",
    mint: new PublicKey("Ag41bMMccCEwtcz3y7RaoW5skQHb6ARqiXjcpjZPpump"),
    threshold: 1_000_00,        //  (decimals=6)
  },

  {
    name: "GREED",
    mint: new PublicKey("12spN17vJb9FunVsyJeSkc8wGTifJksUe4kdHXWVBAGS"),
    threshold: 1_000_00,        //  (decimals=6)
  },


  {
    name: "SOLANO",
    mint: new PublicKey("6AiuSc3pYM5rpbKPq8JfSQoMoUsfDpzvP5PmMSEKpump"),
    threshold: 1_000_00,        //  (decimals=6)
  },




  {
    name: "WHATIF",
    mint: new PublicKey("Co9TrFstWCLqp5bs4KPhxS73bf5ijXoEX4vzJVD5pump"),
    threshold: 1_000_00,        //  (decimals=6)
  },




  {
    name: "CINEMA",
    mint: new PublicKey("FL4eKdJrVZ1dVu1RoekeQRnuPxavzD4oCcR5HTcspump"),
    threshold: 1_000_00,        //  (decimals=6)
  },




  {
    name: "COCACOIN",
    mint: new PublicKey("CSgAt76hAjjNyiv6UikFsHcjsLpXwmjSjCHaDF7aCoCa"),
    threshold: 1_000_00,        //  (decimals=6)
  },



  {
    name: "MIKA",
    mint: new PublicKey("55WZGGCwE66xnCxBcAxKSNT49wzeaHhT9jE2xWSXpump"),
    threshold: 1_000_00,        //  (decimals=6)
  },


  {
    name: "PEDRE",
    mint: new PublicKey("J1aQdXGPXEzLi6FyY1ia9tdoFenuc1T1oTUDLWa9pump"),
    threshold: 1_000_00,        //  (decimals=6)
  },


  {
    name: "CALUM",
    mint: new PublicKey("29zSyzwEntVxavnGWhbKBv1dgZBCfpyPNRAfTTfbBAGS"),
    threshold: 1_000_00,        //  (decimals=6)
  },

  {
    name: "PUMPKIN",
    mint: new PublicKey("9Eufcq8yqukb4A9eUTAXrRpzB7aKTdAuUnqe75ttpump"),
    threshold: 1_000_00,        //  (decimals=6)
  },

  {
    name: "MARRYME",
    mint: new PublicKey("Gvhoq1yGWGPG7an9PPDCLFqvB37xJGQUJw5FtVKZFMmE"),
    threshold: 1_000_00,        //  (decimals=6)
  },

  {
    name: "PAYAI",
    mint: new PublicKey("E7NgL19JbN8BhUDgWjkH8MtnbhJoaGaWJqosxZZepump"),
    threshold: 1_000_0,        //  (decimals=6)
  },

  {
    name: "MILKY",
    mint: new PublicKey("8E4hsdLbbzC1hWGnpS1GKZtDJG29DdEM1TZvGkzHjups"),
    threshold: 1_000_00,        //  (decimals=6)
  },

  {
    name: "WURK",
    mint: new PublicKey("ALR5X2H6THn2VDPoMtkVwxVktcN1kQGvxCwLfejzpump"),
    threshold: 1_000_00,        //  (decimals=6)
  },



  {
    name: "SACHOCOIN",
    mint: new PublicKey("91act8ejuXSvR1qEahRjziCPyupDMnUqcm5NL3NDpump"),
    threshold: 1_000_00,        //  (decimals=6)
  },



  {
    name: "DEADGUY",
    mint: new PublicKey("3tPqGuHeHcqD7xgAPNSCv8Wxfb8Ja2v75MQWp6W4pump"),
    threshold: 1_000_00,        //  (decimals=6)
  },



  {
    name: "PHANTOSHI",
    mint: new PublicKey("GVmT4N7Y8BDDCZkN3K816AZ29yqE7EREkDFQ3E6iLd3H"),
    threshold: 1_000_00,        //  (decimals=6)
  },



  {
    name: "TTR",
    mint: new PublicKey("TTRXx2ypNmtMALQpk9CEy3eCr7sq47tJohvfEtKVVZJ"),
    threshold: 1_000_00,        //  (decimals=6)
  },


  {
    name: "FUN",
    mint: new PublicKey("G849nDx4r1vwjibbmpjkZ6pbDWwaMouhkWLq1o8Z5FUN"),
    threshold: 1_000_00,        //  (decimals=6)
  },



  {
    name: "TRUMPKIN",
    mint: new PublicKey("BSJXgXNTyfxCGXgJ95MAvRepPg57NLpqfLfQyRYxFpKn"),
    threshold: 1_000_00,        //  (decimals=6)
  },



  {
    name: "BUNNIE",
    mint: new PublicKey("7XeR2pjfqocWAVmV3fefcCPgZNE4eByV2vgdcjs9pump"),
    threshold: 1_000_00,        //  (decimals=6)
  },



  {
    name: "WALLSTREET",
    mint: new PublicKey("8k1DvnFBsbuWJw2t4JqTibR7cAgqadMveqiykMr1pump"),
    threshold: 1_000_00,        //  (decimals=6)
  },



  {
    name: "FLOW402X",
    mint: new PublicKey("HDzTPAndwe5XRvReLzLdUNaNCkbVv141ELZ2AGKGCpAA"),
    threshold: 1_000_00,        //  (decimals=6)
  },


  {
    name: "NEO-SEASON",
    mint: new PublicKey("CanXHoduVVQgvp5SDFe5hDCaHHSGc1byH4ev1ARUpump"),
    threshold: 1_000_00,        //  (decimals=6)
  },


  {
    name: "ORB",
    mint: new PublicKey("7iRW57yuUXFehj5UzxvVaHCJjYCRyc2jPM2JFQq5pump"),
    threshold: 1_000_00,        //  (decimals=6)
  },


  {
    name: "OPENLIBx402",
    mint: new PublicKey("FhNBgfr3J2zqfASEvTGMpHWsRNc9JkoRvaazk9NFpump"),
    threshold: 1_000_00,        //  (decimals=6)
  },


  {
    name: "WAYNE",
    mint: new PublicKey("C56say1io8uGLCPzxRYtcwoN5JXKc4E8wcSnQJj9pump"),
    threshold: 1_000_00,        //  (decimals=6)
  },


  {
    name: "VIVIAN",
    mint: new PublicKey("HL8ihMrMCt8geoBBCgob1b7VH9wZ4ahQ4H6mhvUyuViV"),
    threshold: 1_000_00,        //  (decimals=6)
  },


  {
    name: "NEO",
    mint: new PublicKey("8fdBKZq7wo9fJbsZEZhq6omCgvKzLt97HY9XaGgqpump"),
    threshold: 1_000_00,        //  (decimals=6)
  },




  {
    name: "NUT",
    mint: new PublicKey("5SEc2JdcAeQPLeASmuXv8cFkVvgekWWEJkQybz19pump"),
    threshold: 1_000_00,        //  (decimals=6)
  },


  {
    name: "SPSN",
    mint: new PublicKey("Sg4k4iFaEeqhv5866cQmsFTMhRx8sVCPAq2j8Xcpump"),
    threshold: 1_000_00,        //  (decimals=6)
  },


  {
    name: "x4PAY",
    mint: new PublicKey("6ikxp2KnQcdCik8Aadi2ScE7qgH4j5C7BvSyA29Wpump"),
    threshold: 1_000_00,        //  (decimals=6)
  },


  {
    name: "KOMI",
    mint: new PublicKey("DZpa4peCErsNzsYJ69XYYTSjZGDQhuexnzj7EiZ1pump"),
    threshold: 1_000_00,        //  (decimals=6)
  },


  {
    name: "MOVEMBER",
    mint: new PublicKey("ETBvFrgNvQ9NnNwg9CAVQjv7XMRJZWeYVHnJYGy9pump"),
    threshold: 1_000_00,        //  (decimals=6)
  },

  {
    name: "JOKER",
    mint: new PublicKey("fbXeZEtrYCSj4oef589UvY8pTjSmByX6TAsLbgdpump"),
    threshold: 1_000_00,        //  (decimals=6)
  },


  {
    name: "PLAIPIN",
    mint: new PublicKey("CnqAQXJB7vSiwdNvgSf22JSPPa53orxSfXn6L2D6pump"),
    threshold: 1_000_00,        //  (decimals=6)
  },



  {
    name: "DIVIDENS",
    mint: new PublicKey("7GB6po6UVqRq8wcTM3sXdM3URoDntcBhSBVhWwVTBAGS"),
    threshold: 1_000_00,        //  (decimals=6)
  },



  {
    name: "ANON",
    mint: new PublicKey("HqVZaYJnEcmKQKRf4K5N8eEuBjkTgpRzVfF7AYBFpump"),
    threshold: 1_000_00,        //  (decimals=6)
  },



  {
    name: "BRIDGE402",
    mint: new PublicKey("86Qzt4Dpx51pYGj7TscfEEBbTspsnQJQpNQxodm6pump"),
    threshold: 1_000_00,        //  (decimals=6)
  },



  {
    name: "COMPANY",
    mint: new PublicKey("6DaSdWSu5NMtpFZkx8iBXUphCjPwPrSkXShbnqi9BAGS"),
    threshold: 1_000_00,        //  (decimals=6)
  },



  {
    name: "KITKAT",
    mint: new PublicKey("9XgfFWPxPU6hyDyGtfhC9D6eyRE3RUSgAYKHRznWpump"),
    threshold: 1_000_00,        //  (decimals=6)
  },


  {
    name: "TRANSFORM",
    mint: new PublicKey("77SDHo2kgfNiYbR4bCPLLaDtjZ22ucTPsD3zFRB5c3Gu"),
    threshold: 1_000_00,        //  (decimals=6)
  },



  {
    name: "RIZZMAS2",
    mint: new PublicKey("8dktTBKseLSsLPpfBYhoKzaAGTAwKqsp6W6UNFtxpump"),
    threshold: 1_000_00,        //  (decimals=6)
  },



  {
    name: "MUMDUMI",
    mint: new PublicKey("FdbTgFitA4NMC96RPfUTafceHoU2VSshA5G2N8VYrF4J"),
    threshold: 1_000_00,        //  (decimals=6)
  },

  {
    name: "UPEXI",
    mint: new PublicKey("3E4UJFK28KUK1q4nzddkPvS2iM53MuTjU8svMrEKpump"),
    threshold: 1_000_00,        //  (decimals=6)
  },


  {
    name: "PURPLE-PEPE",
    mint: new PublicKey("HBoNJ5v8g71s2boRivrHnfSB5MVPLDHHyVjruPfhGkvL"),
    threshold: 1_000_00,        //  (decimals=6)
  },


  {
    name: "snp500",
    mint: new PublicKey("FwUgtxHRXPjEmCcXkCQ8KZa8hdUPRuByxNQEZcFypump"),
    threshold: 1_000_00,        //  (decimals=6)
  },


  {
    name: "HAJIMI",
    mint: new PublicKey("79e2P2GxExotT5jtUNNs3Nyp9YzRk28WTJYXHr4ypump"),
    threshold: 1_000_00,        //  (decimals=6)
  },


  {
    name: "BILLY",
    mint: new PublicKey("J7Dx5yPbPD5e5BmrSvJyi4n4XRUR2kWqWYaxaSWdpump"),
    threshold: 1_000_00,        //  (decimals=6)
  },


  {
    name: "MONAD",
    mint: new PublicKey("CrAr4RRJMBVwRsZtT62pEhfA9H5utymC2mVx8e7FreP2"),
    threshold: 1_000_00,        //  (decimals=6)
  },


  {
    name: "PLOI",
    mint: new PublicKey("ydDccyq66xKtfqn5bsRpfFXz4WeF4fh3bgQBx1npump"),
    threshold: 1_000_00,        //  (decimals=6)
  },


  {
    name: "FRANKLIN",
    mint: new PublicKey("CSrwNk6B1DwWCHRMsaoDVUfD5bBMQCJPY72ZG3Nnpump"),
    threshold: 1_000_00,        //  (decimals=6)
  },



  {
    name: "QBS",
    mint: new PublicKey("2BAKjB47KpQD64m3nWGWrNjC2ZTwWpumYakJVgavdXQa"),
    threshold: 1_000_00,        //  (decimals=6)
  },



  {
    name: "STILLGUHD",
    mint: new PublicKey("4gmvi8Kg2bVchKAziV1j2yDtHXj268AtSYYyMToBpump"),
    threshold: 1_000_00,        //  (decimals=6)
  },



  {
    name: "XIAOXIAO",
    mint: new PublicKey("BYTLpMjPLRq9wuB1QsyA4rMYrMrRnUqPsQTtFuwPpump"),
    threshold: 1_000_00,        //  (decimals=6)
  },



  {
    name: "ZUNO",
    mint: new PublicKey("G1VhWSAhYXRRzokGqxs4aQ8u5DSuP69ki2bN7hnapjzZ"),
    threshold: 1_000_00,        //  (decimals=6)
  },



  {
    name: "XMAS",
    mint: new PublicKey("9BYVxhYF4tWSRVyJUBSVC8PaAhuuiCiAbmfy4hUApump"),
    threshold: 1_000_00,        //  (decimals=6)
  },



  {
    name: "MINER",
    mint: new PublicKey("Gka1TQEevBbVw4W9K15ER96ZzKByMTb6TBMQzWFEpump"),
    threshold: 1_000_00,        //  (decimals=6)
  },




  {
    name: "CONCHO",
    mint: new PublicKey("89q6aHpZ1fXhuwpnrBgqmCvuAX4GaCrRPQNp5xVHpump"),
    threshold: 1_000_00,        //  (decimals=6)
  },




  {
    name: "KABUTOPS",
    mint: new PublicKey("Dt4EGQDUyzyg1jFJVTaGXp9EikFJs6EH5QipHbAVpump"),
    threshold: 1_000_00,        //  (decimals=6)
  },





  {
    name: "RIZZMASCTO",
    mint: new PublicKey("9w3pJSRhxPFAvsxNJDkQV7kvAj3DtSQJXFPnVCKWYeba"),
    threshold: 1_000_00,        //  (decimals=6)
  },




  {
    name: "KABUTO",
    mint: new PublicKey("A9E2AopuG56LWYiXsvGLLTcLjUjQ539PY6k5Fhfepump"),
    threshold: 1_000_00,        //  (decimals=6)
  },



  {
    name: "ECHO",
    mint: new PublicKey("FKMdhDBjirErUMQbffsZiuvjptSwNnFW7kf6fvpTpump"),
    threshold: 1_000_00,        //  (decimals=6)
  },





  {
    name: "KABOSU",
    mint: new PublicKey("85wiEiRVoBKcLWvn7sUJQ5dNndddC1rYsZAn21p3pump"),
    threshold: 1_000_00,        //  (decimals=6)
  },





  {
    name: "SOYJAK",
    mint: new PublicKey("AkwneToXzViQHQekpCtNW9sBn9oEjTwqT4JYwGgSpump"),
    threshold: 1_000_00,        //  (decimals=6)
  },





  {
    name: "ZHETA",
    mint: new PublicKey("BL6ZyVAWNk7JyuA8fesVfMFPiKAncPBQ5JXLkpN2pump"),
    threshold: 1_000_00,        //  (decimals=6)
  },





  {
    name: "401JK",
    mint: new PublicKey("Cz7LGKdZPpAxonXx23ZYPW3RtDQvjcf17ZDCZEzFpump"),
    threshold: 1_000_00,        //  (decimals=6)
  },




  {
    name: "BUTTCOIN",
    mint: new PublicKey("1PNnDdzy3hfKaUW6L35fmwDUwDkuCjwJqaBkAeubUTT"),
    threshold: 1_000_00,        //  (decimals=6)
  },




  {
    name: "SAMANTHA",
    mint: new PublicKey("27Qgup4Nt3sQ4bpxaFEvLwprGUfdMRqtYgmVcyvLpump"),
    threshold: 1_000_00,        //  (decimals=6)
  },





  {
    name: "ZAIOS",
    mint: new PublicKey("CibZ8y7HR75Pa65NGMr3keDd53DxaYuJ4bR7eoEwpump"),
    threshold: 1_000_00,        //  (decimals=6)
  },





  {
    name: "RNUT",
    mint: new PublicKey("BkEvgC9nfhy9TpCJDPUGy9ANXbYMxosfmLzk35gqpump"),
    threshold: 1_000_00,        //  (decimals=6)
  },





  {
    name: "SHITCOIN",
    mint: new PublicKey("8KYFHjCaGbj7ZSangzq35BeEaEjbNuVGekbAcYaFpump"),
    threshold: 1_000_00,        //  (decimals=6)
  },





  {
    name: "ROCKY",
    mint: new PublicKey("Ep4kgeqi6T5JrdJTbiXQcAjY3ZDAWh6meavJok9Epump"),
    threshold: 1_000_00,        //  (decimals=6)
  },





  {
    name: "BIG",
    mint: new PublicKey("FT6ZnLbmaQbUmxbpe69qwRgPi9tU8QGY8S7gqt4Wbonk"),
    threshold: 1_000_00,        //  (decimals=6)
  },





  {
    name: "DOT",
    mint: new PublicKey("AbP5LEN4sAAjghBy6ww37ngAAT7hnBVfXmXNdCnbpump"),
    threshold: 1_000_00,        //  (decimals=6)
  },





  {
    name: "FLYING-KETAMINE",
    mint: new PublicKey("BCXpjsHYmgVpRKdv4EQv1RARhYagnnwPkJjYbvM6bonk"),
    threshold: 1_000_00,        //  (decimals=6)
  },

  {
    name: "PUMP-CLAUS",
    mint: new PublicKey("XXa8E8Kx79Tv7AFheigWvZ3gMaHU225EpVbGvvg4i5u"),
    threshold: 1_000_00,        //  (decimals=6)
  },


  {
    name: "CASH",
    mint: new PublicKey("CASHx9KJUStyftLFWGvEVf59SGeG9sh5FfcnZMVPCASH"),
    threshold: 1_000_00,        //  (decimals=6)
  },



  {
    name: "MUSH",
    mint: new PublicKey("CQ4PZEmJkR8Zchhfp21fkoCAJuZiv2dhA4QfKqupump"),
    threshold: 1_000_00,        //  (decimals=6)
  },


  {
    name: "89",
    mint: new PublicKey("89E7wc1H2LmzEGSa96hWURcsVs5V9ByWdNM7rctSpump"),
    threshold: 1_000_00,        //  (decimals=6)
  },


  {
    name: "BLACK-WHALE",
    mint: new PublicKey("8y45AJzCUBSZL1UDFQRzCKovQBLQFudBrpPeg5yNpump"),
    threshold: 1_000_00,        //  (decimals=6)
  },


  {
    name: "ZEC",
    mint: new PublicKey("9sTcbeo5edvvvGpb1JwyBPCiBnNL28zbijp1QD1aivxd"),
    threshold: 1_000_00,        //  (decimals=6)
  },


  {
    name: "114514",
    mint: new PublicKey("AGdGTQa8iRnSx4fQJehWo4Xwbh1bzTazs55R6Jwupump"),
    threshold: 1_000_00,        //  (decimals=6)
  },


  {
    name: "YAJU",
    mint: new PublicKey("BRrc4qh3t1wpE97FETgea1DEefu8A95Cu3g9vcN5pump"),
    threshold: 1_000_00,        //  (decimals=6)
  },


  {
    name: "RENEE",
    mint: new PublicKey("3iWneHEeSaAe3tMBp45B4fMFQWbrYWLLitRa6P84pump"),
    threshold: 1_000_00,        //  (decimals=6)
  },


  {
    name: "SHITCOIN",
    mint: new PublicKey("G2dJVAF27n4xBGjftmrpTydiUGb5eCjferW3KDRubonk"),
    threshold: 1_000_00,        //  (decimals=6)
  },


  {
    name: "FACTORY",
    mint: new PublicKey("BkSbFrDMkfkoG4NDUwadEGeQgVwoXkR3F3P1MPUnBAGS"),
    threshold: 1_000_00,        //  (decimals=6)
  },


  {
    name: "WHITE-WHALE",
    mint: new PublicKey("a3W4qutoEJA4232T2gwZUfgYJTetr96pU4SJMwppump"),
    threshold: 1_000_00,        //  (decimals=6)
  },


  {
    name: "PURK",
    mint: new PublicKey("BBG3vpXVCm2uPBD7LUr7yfP9XUXVNJRHMtiMG7q4pump"),
    threshold: 1_000_00,        //  (decimals=6)
  },


  {
    name: "ASCEND",
    mint: new PublicKey("nck4kgBn5NZk78TSnWidM3t7Frvps7FhZCjGeC9pump"),
    threshold: 1_000_00,        //  (decimals=6)
  },


  {
    name: "USD1",
    mint: new PublicKey("USD1ttGY1N17NEEHLmELoaybftRBUSErhqYiQzvEmuB"),
    threshold: 1_000_00,        //  (decimals=6)
  },


  {
    name: "ALIENS",
    mint: new PublicKey("F5tfztTnE4sYsMhZT5KrFpWvHmYSfJZoRjCuxKPbpump"),
    threshold: 1_000_00,        //  (decimals=6)
  },

  {
    name: "2131kobustas",
    mint: new PublicKey("4vGHdzcNrDf8XVE8H19Rqea86RULz7xi89ew1sSJpump"),
    threshold: 1_000_00,        //  (decimals=6)
  },

  {
    name: "WILL",
    mint: new PublicKey("Ai4CL1SAxVRigxQFwBH8S2JkuL7EqrdiGwTC7JpCpump"),
    threshold: 1_000_00,        //  (decimals=6)
  },


  {
    name: "CLUDE",
    mint: new PublicKey("AWGCDT2gd8JadbYbYyZy1iKxfWokPNgrEQoU24zUpump"),
    threshold: 1_000_00,        //  (decimals=6)
  },

  
  {
    name: "SLURMIT",
    mint: new PublicKey("9MS4ptpnnJhBsWYShPw1tP1ykAmwEmkPXP9aLVpwpump"),
    threshold: 1_000_00,        //  (decimals=6)
  },



  
  {
    name: "WIENER",
    mint: new PublicKey("GvQH1VGGbrjeRSbsCreptYN4GUcZ9w7vMFJ5ic8ypump"),
    threshold: 1_000_00,        //  (decimals=6)
  },



 
  
  {
    name: "AmIBroke",
    mint: new PublicKey("EZnFX6wukLgQ1KRDbvgg57bCimo77DZ5cHB98JoJpump"),
    threshold: 1_000_00,        //  (decimals=6)
  },



 
  
  {
    name: "AUTISM",
    mint: new PublicKey("8jiVXftnn2ZG6bugK7HAH5j2G3D6TpsG521gqsWwpump"),
    threshold: 1_000_00,        //  (decimals=6)
  },



 
  
  {
    name: "PIPPKIN",
    mint: new PublicKey("6ydMmFRaNt4AHBjgvSogbBvcxnTrX3QzUe2AEzVppump"),
    threshold: 1_000_00,        //  (decimals=6)
  },



 
  
  {
    name: "PMPR",
    mint: new PublicKey("AX9D7Nqtu3enaeL4ELxoagsNV7AyEQEhK2ziwiyJpump"),
    threshold: 1_000_00,        //  (decimals=6)
  },



 
  
  {
    name: "PUNCH",
    mint: new PublicKey("NV2RYH954cTJ3ckFUpvfqaQXU4ARqqDH3562nFSpump"),
    threshold: 1_000_00,        //  (decimals=6)
  },



 
  
  {
    name: "HACHI",
    mint: new PublicKey("x95HN3DWvbfCBtTjGm587z8suK3ec6cwQwgZNLbWKyp"),
    threshold: 1_000_00,        //  (decimals=6)
  },



 
  
  {
    name: "URMOM",
    mint: new PublicKey("9j6twpYWrV1ueJok76D9YK8wJTVoG9Zy8spC7wnTpump"),
    threshold: 1_000_00,        //  (decimals=6)
  },



 
  
  {
    name: "ARC",
    mint: new PublicKey("61V8vBaqAGMpgDQi4JcAwo1dmBGHsyhzodcPqnEVpump"),
    threshold: 1_000_00,        //  (decimals=6)
  },



 
  
  {
    name: "BILLCLINTON",
    mint: new PublicKey("6Cka4cPGBbuQtWuyp3KpTMAnyGjjR7YXVFTafmoNpump"),
    threshold: 1_000_00,        //  (decimals=6)
  },



 
  
  {
    name: "BROKE",
    mint: new PublicKey("EZnFX6wukLgQ1KRDbvgg57bCimo77DZ5cHB98JoJpump"),
    threshold: 1_000_00,        //  (decimals=6)
  },



 
  
  {
    name: "BFS",
    mint: new PublicKey("2k8yZaJjf61unHriuqdmvbxe7CUhEYML5kVJDbcotKjU"),
    threshold: 1_000_00,        //  (decimals=6)
  },


  {
    name: "Lobstar",
    mint: new PublicKey("AVF9F4C4j8b1Kh4BmNHqybDaHgnZpJ7W7yLvL7hUpump"),
    threshold: 1_000_00,        //  (decimals=6)
  },

 

  {
    name: "Pombon",
    mint: new PublicKey("v8ic5ww8fy6ejkq4Cr5CVpYnstaXjMsRGJZSWn5SS1t"),
    threshold: 1_000_00,        //  (decimals=6)
  },


  {
    name: "JELLYBEAN",
    mint: new PublicKey("412zDygnwP9DzitnQVgRKUFFTDmrYScFch6P2k39pump"),
    threshold: 1_000_00,        //  (decimals=6)
  },


  {
    name: "DESIGN",
    mint: new PublicKey("3BheocqQgiYvLnDTuT82WcpyTxhuGtJ3Vjb8f9fbyBLV"),
    threshold: 1_000_00,        //  (decimals=6)
  },


  {
    name: "PIGEON",
    mint: new PublicKey("4fSWEw2wbYEUCcMtitzmeGUfqinoafXxkhqZrA9Gpump"),
    threshold: 1_000_00,        //  (decimals=6)
  },


  {
    name: "OPENWAR",
    mint: new PublicKey("G7QNLoCrtvdecXGr33C93WRBWjBerUM6SmrdFNV5Ztha"),
    threshold: 1_000_00,        //  (decimals=6)
  },

 
  
  {
    name: "PEACE",
    mint: new PublicKey("atVjZ7uM8sVrLFi5Xe1JiLGW6mW9pvQdTCWzhNFpump"),
    threshold: 1_000_00,        //  (decimals=6)
  },


  
   {
    name: "BELLATOR",
    mint: new PublicKey("Cc841PdMQUNWq989BszMHcjipGw89CBxDygiweb1pump"),
    threshold: 1_000_00,        //  (decimals=6)
  },

  
  {
    name: "WW3",
    mint: new PublicKey("7m2TUkpPZCScBhPJnGjWjbh75KkDNnwAdd7i74m8awad"),
    threshold: 1_000_00,        //  (decimals=6)
  },

  
  {
    name: "FISH",
    mint: new PublicKey("CmgJ1PobhUqB7MEa8qDkiG2TUpMTskWj8d9JeZWSpump"),
    threshold: 1_000_00,        //  (decimals=6)
  },

  
  {
    name: "GORK",
    mint: new PublicKey("gorkrgj6k4K449Qa4eF1NaWC5cNLQtMsVEikhpGn7fC"),
    threshold: 1_000_00,        //  (decimals=6)
  },


  {
    name: "RUCK",
    mint: new PublicKey("DKqgMMtEiAMXR8iz4tpVXgnmL8Bgzbu4XPyUrZWrpump"),
    threshold: 1_000_00,        //  (decimals=6)
  },


  

  {
    name: "TREN",
    mint: new PublicKey("HLnTNCG5RD7jYVduFc1pMCHiuApoWGn9LveqEFanQFZb"),
    threshold: 1_000_00,        //  (decimals=6)
  },


  


  {
    name: "DOOM",
    mint: new PublicKey("AukyjhMSmN5VEGjQ9npeu6Eu9X21feL1qCbZSPeJpump"),
    threshold: 1_000_00,        //  (decimals=6)
  },


  


  {
    name: "GROKIUS",
    mint: new PublicKey("67ezHLk8PUkjJCXjmmgPbx85VowA52ghfRXa9A8Tpump"),
    threshold: 1_000_00,        //  (decimals=6)
  },


  


  {
    name: "DIGITAL OIL",
    mint: new PublicKey("5LS3ips7jWxfuVHzoMzKzp3cCwjH9zmrtYXmYBVGpump"),
    threshold: 1_000_00,        //  (decimals=6)
  },


  

  {
    name: "Gooseman",
    mint: new PublicKey("BprouMoau36y1x6TxiLbHd59Q2eJgrKSBGdzcc6pump"),
    threshold: 1_000_00,        //  (decimals=6)
  },

  

  {
    name: "PENCIL",
    mint: new PublicKey("5su44fkvYNM1WnMCgteXu7HFUywQBtKZqjwgmCk9pump"),
    threshold: 1_000_00,        //  (decimals=6)
  },



  

  {
    name: "TRINKET",
    mint: new PublicKey("BERrTba2FLMEzxzgcu3XiuZ9XopVdPKmDmEnmZUfB6B7"),
    threshold: 1_000_00,        //  (decimals=6)
  },




  

  {
    name: "WHAT-TO-DO",
    mint: new PublicKey("6iA73gWCKkLWKbVr8rgibV57MMRxzsaqS9cWpgKBpump"),
    threshold: 1_000_00,        //  (decimals=6)
  },



    

  {
    name: "vsol",
    mint: new PublicKey("VzZhQtgi4Wo4K7PBJsXY6G3X9KjyT2sB9i3XYWavjrS"),
    threshold: 1_000_00,        //  (decimals=6)
  },


    

  {
    name: "OILX",
    mint: new PublicKey("PqXub2t6A2vvUb3Mevk4uhj339rMhhmxq2HQzYNmoon"),
    threshold: 1_000_00,        //  (decimals=6)
  },


    

  {
    name: "ONE",
    mint: new PublicKey("GMD16hpoKqfpXpPTWoymvzjddsruQsdqPu8T28ZKpump"),
    threshold: 1_000_00,        //  (decimals=6)
  },


    

  {
    name: "KORO",
    mint: new PublicKey("DBGL74uRgushMBChsXgNkMEGtrFP6dNG8hLyNyWRpump"),
    threshold: 1_000_00,        //  (decimals=6)
  },


    
    

  {
    name: "X-MONEY",
    mint: new PublicKey("EnTu4xYmd49b6drs6FwTodxcJW1sHFurbvueyk9Kpump"),
    threshold: 1_000_00,        //  (decimals=6)
  },


    
    

  {
    name: "EmC2",
    mint: new PublicKey("E9SmMCvtLfitMwkLzkduwgN8ZYcfepiELLQ8d1SApump"),
    threshold: 1_000_00,        //  (decimals=6)
  },


    
    

  {
    name: "LAMBO",
    mint: new PublicKey("g9mbhzqfgJLGcjGVzpZbsCmtaMYvhbgEvuMeztWpump"),
    threshold: 1_000_00,        //  (decimals=6)
  },


    
  {
    name: "whitehouse",
    mint: new PublicKey("7oXNE1dbpHUp6dn1JF8pRgCtzfCy4P2FuBneWjZHpump"),
    threshold: 1_000_00,        //  (decimals=6)
  },


  {
    name: "btc pizza",
    mint: new PublicKey("G9ivB7K41a4G8m1k4QdxxN4L5eGKL7Mr12S26B85pump"),
    threshold: 1_000_00,        //  (decimals=6)
  },

  {
    name: "usor",
    mint: new PublicKey("USoRyaQjch6E18nCdDvWoRgTo6osQs9MUd8JXEsspWR"),
    threshold: 1_000,        //  (decimals=6)
  },



  {
    name: "tapcard",
    mint: new PublicKey("AGh8iSH88t3U8jLnEW9epKh5Ms49Crf7nPTpEnbWoHWQ"),
    threshold: 1_000,        //  (decimals=6)
  },





  {
    name: "pedgy",
    mint: new PublicKey("EG6zP6zWJjcNz563nAjcmNQYhkwbqVbDFpRsWx11pump"),
    threshold: 1_000,        //  (decimals=6)
  },



  {
    name: "WHITE HOUSE",
    mint: new PublicKey("7oXNE1dbpHUp6dn1JF8pRgCtzfCy4P2FuBneWjZHpump"),
    threshold: 1_000,        //  (decimals=6)
  },



  {
    name: "CINCESOL",
    mint: new PublicKey("GWcAPiF2cBf5de8E1eSERcnVdH411NqT2peG7zDJpump"),
    threshold: 1_000,        //  (decimals=6)
  },



  {
    name: "TRISIG",
    mint: new PublicKey("BLDiYcvm3CLcgZ7XUBPgz6idSAkNmWY6MBbm8Xpjpump"),
    threshold: 1_000,        //  (decimals=6)
  },



  {
    name: "pedgy",
    mint: new PublicKey("CwuUseL2GdZQ5iHLJeD635N1vicACNv5NSGVaqWUcW24"),
    threshold: 1_000,        //  (decimals=6)
  },


  


  


  




];
