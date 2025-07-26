/// <reference types="react" />

// global JSX namespace’i genişletiyoruz:
declare namespace JSX {
  interface IntrinsicElements {
    // tüm custom element’leri “any” kabul et:
    [tagName: string]: any;
  }
}
