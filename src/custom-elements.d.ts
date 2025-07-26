// src/custom-elements.d.ts

import React from "react";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      // web3modal’ın custom-element’leri
      "w3m-modal": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      "w3m-header": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      "w3m-router": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      "w3m-warning-view": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      "w3m-snackbar": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      "w3m-alertbar": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      // @web3modal/ui (wui-*)
      "wui-flex": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      "wui-icon-link": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      "wui-icon": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      "wui-shimmer": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      "wui-text": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      "wui-button": React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;
    }
  }
}
