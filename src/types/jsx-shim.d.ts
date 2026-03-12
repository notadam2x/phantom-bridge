// src/types/jsx-shim.d.ts
import 'react';

declare global {
  namespace JSX {
    // Bilinmeyen TÜM custom element'leri kabul et (w3m-*, wui-*, vs.)
    interface IntrinsicElements {
      [elemName: string]: any;
    }
  }
}

export {};
