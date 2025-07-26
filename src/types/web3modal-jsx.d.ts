// src/types/web3modal-jsx.d.ts
import type React from 'react';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      // w3m web components
      'w3m-modal': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      'w3m-header': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      'w3m-router': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      'w3m-warning-view': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      'w3m-snackbar': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      'w3m-alertbar': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;

      // wui web components
      // -> Özel attribute’lara (icon, size, variant, justifycontent vb.) izin vermek için
      'wui-flex': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & Record<string, any>;
      'wui-icon-link': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & Record<string, any>;
      'wui-icon': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & Record<string, any>;
      'wui-text': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & Record<string, any>;
      'wui-shimmer': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & Record<string, any>;
      'wui-button': React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> & Record<string, any>;
    }
  }
}

export {};
