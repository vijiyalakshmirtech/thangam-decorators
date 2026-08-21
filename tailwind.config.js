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
          gold: {
            50: '#FAF7E8',
            100: '#F4EBC4',
            200: '#EDE0A0',
            300: '#E6CE78',
            400: '#DFC158',
            500: '#D4AF37', // Primary Brand Gold
            600: '#B89020',
            700: '#967215',
            800: '#7A5D0E',
            900: '#5C4407',
          },
          dark: {
            950: '#0A0C0E', // Deepest background
            900: '#12151A', // Card surface
            850: '#161A22', // Hover surface
            800: '#1B2028', // Elevated border
            700: '#2C3442',
            600: '#424D60',
          },
          maroon: {
            600: '#982534',
            700: '#7A1C28', // Heritage Temple Maroon
            800: '#560F18',
            900: '#3B0A10',
          },
          ivory: {
            50: '#FDFBF7',
            100: '#F7F3EB',
            200: '#EFE7D8',
            300: '#E0D2BA',
          },
          emerald: {
            500: '#238A64',
            600: '#1B6E50',
            700: '#134E39', // Foliage Emerald
            800: '#0E3829',
          },
          whatsapp: '#25D366',
        }
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Playfair Display', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
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
