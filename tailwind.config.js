/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        thangam: {
          burgundy: {
            DEFAULT: '#6E1830', // Primary Burgundy
            50: '#FDF2F4',
            100: '#FBE4E8',
            200: '#F8CBD3',
            300: '#F2A3B1',
            400: '#E66F85',
            500: '#D4405E',
            600: '#B82645',
            700: '#951B34',
            800: '#6E1830', // Primary Brand Burgundy
            900: '#4A1022', // Deep Wine
            950: '#300713', // Ultra Deep Wine
          },
          wine: '#4A1022',
          cream: {
            DEFAULT: '#F7F0E4', // Warm Cream (60% dominant canvas)
            50: '#FFFDF8',      // Soft Ivory
            100: '#FAF5EC',
            200: '#F7F0E4',     // Warm Cream
            300: '#EFE7D8',     // Muted Sand
            400: '#E2D5BE',
            500: '#D0BF9F',
          },
          ivory: '#FFFDF8',
          gold: {
            DEFAULT: '#C9A45C', // Champagne Gold
            50: '#FAF6ED',
            100: '#F4ECD8',
            200: '#E9D7B0',
            300: '#DEC288',
            400: '#D4B36F',
            500: '#C9A45C',     // Primary Champagne Gold
            600: '#B58D44',
            700: '#967132',
            800: '#7B5C2B',
            900: '#654B24',
          },
          rose: '#B88A78',      // Muted Rose Gold
          charcoal: '#1F161A',  // Velvet Rich Charcoal
          darkText: '#2C1820',
          whatsapp: '#25D366',
        }
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Playfair Display', '"Noto Serif Tamil"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', '"Mukta Malar"', 'system-ui', '-apple-system', 'sans-serif'],
        tamil: ['"Noto Serif Tamil"', '"Mukta Malar"', 'serif'],
      },
      boxShadow: {
        'gold-sm': '0 0 10px rgba(212, 175, 55, 0.15)',
        'gold-md': '0 0 20px rgba(212, 175, 55, 0.25)',
        'gold-lg': '0 0 30px rgba(212, 175, 55, 0.35)',
        'card-dark': '0 8px 30px rgba(0, 0, 0, 0.4)',
      },
      borderRadius: {
        'luxury': '8px',
        'luxury-lg': '14px',
      },
      maxWidth: {
        'site': '1280px',
      },
    },
  },
  plugins: [],
}
