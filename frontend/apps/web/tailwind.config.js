/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Cinema Theme Colors
        cinema: {
          red: '#dc2626',
          black: '#0f0f0f',
          gold: '#fbbf24',
          gray: '#f3f4f6',
          'dark-gray': '#1f2937',
          burgundy: '#7f1d1d',
          crimson: '#dc143c',
        },
        // Custom gradients
        'gradient-start': '#000000',
        'gradient-middle': '#1f2937',
        'gradient-end': '#7f1d1d',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'fade-in-up': 'fadeInUp 0.5s ease-out',
        'bounce-slow': 'bounce 2s infinite',
        'pulse-slow': 'pulse 3s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': {
            opacity: '0',
            transform: 'translateY(20px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
      },
      backgroundImage: {
        'cinema-gradient': 'linear-gradient(135deg, #000000 0%, #1f2937 50%, #7f1d1d 100%)',
        'red-gradient': 'linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)',
        'gold-gradient': 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
      },
      boxShadow: {
        'cinema-glow': '0 0 20px rgba(220, 38, 38, 0.3)',
        'cinema-strong': '0 10px 40px rgba(220, 38, 38, 0.4)',
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}