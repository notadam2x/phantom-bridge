// src/custom-elements.d.ts
export {};

declare global {
  namespace JSX {
    interface IntrinsicElements {
      // w3m-… bileşenleri
      "w3m-modal": any;
      "w3m-header": any;
      "w3m-router": any;
      "w3m-warning-view": any;
      "w3m-snackbar": any;
      "w3m-alertbar": any;
      // wui-… bileşenleri
      "wui-flex": any;
      "wui-icon-link": any;
      "wui-icon": any;
      "wui-shimmer": any;
      "wui-text": any;
      "wui-button": any;
    }
  }
}
