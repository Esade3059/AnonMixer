/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#E8ECEC',
          100: '#D1D9DA',
          200: '#A3B3B5',
          300: '#758D90',
          400: '#698689',
          500: '#47676B',
          600: '#395256',
          700: '#2B3E40',
          800: '#1C292B',
          900: '#0E1515',
        },
        secondary: {
          50: '#EAF0F0',
          100: '#D5E1E1',
          200: '#ABC3C3',
          300: '#81A5A5',
          400: '#578787',
          500: '#2D6969',
          600: '#245454',
          700: '#1B3F3F',
          800: '#122A2A',
          900: '#091515',
        },
        accent: {
          50: '#F0F5F5',
          100: '#E1EBEB',
          200: '#C3D7D7',
          300: '#A5C3C3',
          400: '#87AFAF',
          500: '#698B8B',
          600: '#547070',
          700: '#3F5353',
          800: '#2A3838',
          900: '#151C1C',
        },
        success: {
          500: '#10B981',
        },
        warning: {
          500: '#F59E0B',
        },
        error: {
          500: '#EF4444',
        },
        dark: {
          100: '#2A3536',
          200: '#1F2829',
          300: '#151B1C',
          400: '#0C0E0F',
          500: '#060708',
        },
        light: {
          100: '#F8FAFA',
          200: '#F0F5F5',
          300: '#E8F0F0',
          400: '#E0EBEB',
          500: '#D8E6E6',
        },
      },
      fontFamily: {
        sans: ['Space Grotesk', 'sans-serif'],
        mono: ['Space Mono', 'monospace'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-slow': 'bounce 3s infinite',
        'glow': 'glow 1.5s ease-in-out infinite alternate',
        'flow': 'flow 20s linear infinite',
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(105, 134, 137, 0.5)' },
          '100%': { boxShadow: '0 0 20px rgba(105, 134, 137, 0.8)' },
        },
        flow: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
      },
    },
  },
  plugins: [],
};