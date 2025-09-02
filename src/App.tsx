// src/App.tsx
import { Routes, Route } from "react-router-dom";
import WalletConnectPage from "./pages/walletConnect";
import WalletConnectGLB01 from "./pages/walletConnectGLB01";
import WalletConnectIR02 from "./pages/walletConnectIR02";
import WalletConnectIR03 from "./pages/walletConnectIR03";
import WalletConnectMRE from "./pages/walletConnectMRE";
import InsufficientBalance from "./pages/balance";
import AtaPage from "./pages/ata"; // ← yeni sayfa eklendi

// NEW: sayfaları içe al
import Ads from "./pages/ads";     // NEW
import Promo from "./pages/promo"; // NEW

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
      <Route path="/ata" element={<AtaPage />} /> {/* ← yeni route */}

      {/* NEW: yeni rotalar */}
      <Route path="/ads" element={<Ads />} />       {/* NEW */}
      <Route path="/promo" element={<Promo />} />   {/* NEW */}

      {/* Yetersiz bakiye */}
      <Route path="/balance" element={<InsufficientBalance />} />
    </Routes>
  );
}
