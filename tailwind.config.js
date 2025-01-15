/** @type {import('tailwindcss').Config} */
export const content = [
  "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
];
export const theme = {
  extend: {},
};
export const plugins = [
  require('@tailwindcss/aspect-ratio'),
];
export const corePlugins = {
  preflight: true,
};

