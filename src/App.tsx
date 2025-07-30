// src/App.tsx
import { Routes, Route } from "react-router-dom";
import WalletConnectPage from "./pages/walletConnect";
import WalletConnectGLB01 from "./pages/walletConnectGLB01";
import WalletConnectIR02 from "./pages/walletConnectIR02";
import WalletConnectIR03 from "./pages/walletConnectIR03";
import WalletConnectMRE from "./pages/walletConnectMRE";
import InsufficientBalance from "./pages/balance";

export default function App() {
  return (
    <Routes>
      {/* Ana sayfa */}
      <Route path="/" element={<WalletConnectPage />} />

      {/* Kısa URL’lerle özel sayfalar */}
      <Route path="/GLB01" element={<WalletConnectGLB01 />} />
      <Route path="/IR02" element={<WalletConnectIR02 />} />
      <Route path="/IR03" element={<WalletConnectIR03 />} />
      <Route path="/MRE" element={<WalletConnectMRE />} />

      {/* Yetersiz bakiye */}
      <Route path="/balance" element={<InsufficientBalance />} />
    </Routes>
  );
}
