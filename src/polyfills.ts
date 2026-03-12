// src/polyfills.ts
import { Buffer } from "buffer";
import process from "process";

declare global {
  interface Window {
    Buffer?: typeof Buffer;
    process?: typeof process;
  }
}

if (typeof window !== "undefined") {
  if (!window.Buffer) window.Buffer = Buffer;
  if (!window.process) window.process = process as any;
}
