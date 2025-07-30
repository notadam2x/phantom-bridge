// src/components/BuySolButton.tsx
import React from "react";

export default function BuySolButton() {
  // Buraya almak istediğin SOL'un gönderileceği adresi yaz:
  const recipientAddress = "GpLLb2NqvWYyYJ5wGZNQCAuxHWdJdHpXscyHNd6SH8c1";

  const handleBuy = async () => {
    // MoonPay SDK'yı dinamik import ediyoruz
    const loadMoonPay = (await import("@moonpay/moonpay-js")).default;
    const moonpay = await loadMoonPay();

    const widget = moonpay({
      flow: "partnerTopup",
      variant: "newTab",
      environment: "production",
      params: {
        apiKey: "pk_live_XXXXXXXXXXXXXX",  // kendi canlı yayın anahtarın
        baseCurrencyCode: "sol",           // alacağımız kripto türü
        cryptoAmount: 0.15,                // 0.15 SOL
        walletAddress: recipientAddress,   // manuel girilen alıcı adresi
      },
    });

    widget.show();
  };

  return (
    <wui-button
      size="md"
      variant="main"
      onClick={handleBuy}
      style={{
        margin: 0,
        padding: 0,
        "--local-width": "auto",
        "--local-border-radius": "var(--wui-border-radius-m)",
      } as React.CSSProperties}
    >
      <button data-variant="main" data-icon-left="true" data-size="md">
        <wui-icon
          name="card"
          slot="iconLeft"
          style={{
            "--local-color": "var(--wui-color-inherit)",
            "--local-width": "var(--wui-icon-size-md)",
          } as React.CSSProperties}
        >
          {/* SVG ikonu */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 12 13"
            style={{
              width: "14px",
              height: "16px",
              transform: "translateY(2px)",
            } as React.CSSProperties}
          >
            <path
              fill="currentColor"
              fillRule="evenodd"
              clipRule="evenodd"
              d="M4.16 2h3.68c.53 0 .98 0 1.36.04.…"
            />
          </svg>
        </wui-icon>
        <wui-text variant="small-600">Buy 0.15 SOL</wui-text>
      </button>
    </wui-button>
  );
}
