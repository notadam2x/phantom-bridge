// src/App.tsx
import { Routes, Route } from "react-router-dom";
import WalletConnectPage from "./pages/walletConnect";
import InsufficientBalance from "./pages/InsufficientBalance";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<WalletConnectPage />} />
      <Route path="/InsufficientBalance" element={<InsufficientBalance />} />
    </Routes>
  );
}
