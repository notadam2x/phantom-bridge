// src/main.tsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react";
import { PhantomWalletAdapter } from "@solana/wallet-adapter-wallets";
import './styles/globals.css';

import "./index.css";
import "./styles/main.css";
import App from "./App";

const endpoint = "https://api.mainnet-beta.solana.com"; // veya istediğin RPC endpoint
const wallets = [new PhantomWalletAdapter()];

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </WalletProvider>
    </ConnectionProvider>
  </StrictMode>
);
