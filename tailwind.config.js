/** @type {import('tailwindcss').Config} */
export const content = [
  "./app/**/*.{js,ts,jsx,tsx,mdx}",
  "./components/**/*"
];
export const theme = {
  extend: {
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

