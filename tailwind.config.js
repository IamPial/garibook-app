/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'gb-primary': '#00827f',
        'gb-primary-dark': '#006563',
        'gb-primary-light': '#0a9c99',
        'gb-primary-subtle': '#e6f3f3',
        'gb-primary-bg': '#f0f9f9',
        'gb-warning': '#f5a623',
        'gb-warning-hover': '#e69819',
        'gb-warning-light': '#fff8e6',
        'gb-dark': '#0d131f',
        'gb-darker': '#080c14',
        'gb-gray-bg': '#f6f8fa',
        'gb-card-border': '#e2e8f0',
        'gb-muted': '#64748b',
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        'gb-card': '0 4px 20px -2px rgba(0, 0, 0, 0.06), 0 2px 6px -1px rgba(0, 0, 0, 0.04)',
        'gb-hover': '0 12px 30px -4px rgba(0, 130, 127, 0.15), 0 4px 12px -2px rgba(0, 0, 0, 0.06)',
        'gb-float': '0 20px 40px -10px rgba(0, 0, 0, 0.12)',
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
}
