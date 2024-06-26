import typography from '@tailwindcss/typography'
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        project: 'url(\'/projectCases-background.png\')',
        right: 'url(\'/projectCases-right.png\')',
      },
    },
  },
  plugins: [
    typography(),
  ],
}
