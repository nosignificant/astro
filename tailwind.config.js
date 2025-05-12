/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,ts,tsx,vue,svelte,css}"],
  theme: {
    extend: {
      colors: {
        page: "var(--page-background)",
        second: "var(--text-second)",
        body: "var(--text-body)",
        heading: "var(--heading)",
        disabled: "var(--text-disabled)",
      },
    },
  },
  plugins: [],
};
