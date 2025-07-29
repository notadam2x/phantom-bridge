// src/utils/phantomEncoded.ts

const rawSvg = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 128 128">
  <path fill="#AB9FF2" d="M0 0h128v128H0z"/>
  <path fill="#FFFDF8" fill-rule="evenodd" clip-rule="evenodd"
    d="M55.6 82.1C51 89.5 43 98.7 32.3 98.7c-5 0-9.9-2-9.9-11 0-23
       31.2-58.4 60.2-58.4 16.5 0 23.1 11.5 23.1 24.5 0 16.6-10.8 35.7
       -21.6 35.7-3.4 0-5-1.9-5-4.8 0-.8 0-1.6.3-2.6-3.7 6.3-10.7 12.1
       -17.4 12.1-4.8 0-7.3-3-7.3-7.3 0-1.5.4-3.1 1-4.8Zm25-28.8c0 3.8
       -2.2 5.7-4.7 5.7-2.6 0-4.8-1.9-4.8-5.7 0-3.8 2.2-5.7 4.8-5.7
       2.5 0 4.7 2 4.7 5.7Zm14.2 0c0 3.8-2.2 5.7-4.7 5.7-2.6 0-4.8-1.9
       -4.8-5.7 0-3.8 2.2-5.7 4.8-5.7 2.5 0 4.7 2 4.7 5.7Z"/>
</svg>`;

export const phantomEncoded =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(rawSvg);





export default function InsufficientBalancePage() {
  return (
    <main className="insufficient-balance-page">
      <div id="_b"></div>

      <w3m-modal
        className="embedded open"
        style={{ "--w3m-modal-width": "430px" } as React.CSSProperties}
      >
        {/* HEADER */}
        <w3m-header className="embedded" style={{ padding: 0, margin: 0 }}>
          <wui-flex
            style={{
              alignItems: "center",
              justifyContent: "center",
              padding: "2px var(--wui-spacing-2l)",
              margin: 0,
            }}
          >
            <wui-text
              color="fg-100"
              variant="large-600"
              style={{
                "--local-align": "center",
                "--local-color": "var(--wui-color-fg-100)",
                fontWeight: 600,
                fontSize: "20px",
                marginTop: "20px",
              } as React.CSSProperties}
            >
              Phantom
            </wui-text>
          </wui-flex>
          <hr
            style={{
              margin: 0,
              marginTop: "10px",
              border: "none",
              borderBottom: "0.5px solid rgba(255,255,255,0.08)",
            }}
          />
        </w3m-header>
