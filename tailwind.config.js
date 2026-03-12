/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                solisium: {
                    black: '#000000',
                    cyan: '#00F0FF',
                    emerald: '#10B981',
                    red: '#FF3B30',
                    dark: '#0A0A0A'
                }
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                mono: ['JetBrains Mono', 'monospace'],
            },
            animation: {
                'spin-fast': 'spin 0.5s linear infinite',
                'spin-medium': 'spin 1.5s cubic-bezier(0.4, 0, 0.2, 1) infinite',
                'spin-slow': 'spin 3s linear infinite',
                'pulse-glow': 'pulseGlow 2s infinite ease-in-out',
                'scanline': 'scanline 8s linear infinite',
            },
            keyframes: {
                pulseGlow: {
                    '0%, 100%': { opacity: '1', filter: 'drop-shadow(0 0 10px rgba(16, 185, 129, 0.5))' },
                    '50%': { opacity: '0.4', filter: 'drop-shadow(0 0 2px rgba(16, 185, 129, 0.1))' },
                },
                scanline: {
                    '0%': { transform: 'translateY(-100%)' },
                    '100%': { transform: 'translateY(100%)' }
                }
            }
        },
    },
    plugins: [],
}
