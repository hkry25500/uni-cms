/** @type {import('tailwindcss').Config} */
export const content = [
  "./app/**/*.{js,ts,jsx,tsx,mdx}",
  "./components/**/*"
];
export const theme = {
  extend: {
    keyframes: {
      'slide-in': {
        '0%': { transform: 'translateY(-100%)' },
        '100%': { transform: 'translateY(0)' },
      },
      'slide-out': {
        '0%': { transform: 'translateY(0)' },
        '100%': { transform: 'translateY(-100%)' },
      },
    },
    animation: {
      'slide-in': 'slide-in 0.5s ease-out forwards',
      'slide-out': 'slide-out 0.5s ease-in forwards',
    },
    zIndex: {
      '60': '60',
      '70': '70',
      '80': '80',
      '90': '90',
      '100': '100',
    },
  },
};
export const plugins = [
  require('@tailwindcss/aspect-ratio'),
];
export const corePlugins = {
  preflight: true,
};
export const darkMode = "class"
