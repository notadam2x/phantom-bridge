// src/App.tsx
import { Routes, Route } from "react-router-dom";
import WalletConnectPage from "./pages/walletConnect";
import InsufficientBalance from "./pages/balance";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<WalletConnectPage />} />
      <Route path="/balance" element={<InsufficientBalance />} />
    </Routes>
  );
}
