// src/types/global.d.ts (oluştur)
export {};

declare global {
  interface Window {
    openModal?: () => void;
    embedded?: boolean;
  }
}
