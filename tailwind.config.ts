import type { Config } from 'tailwindcss'
const { nextui } = require('@nextui-org/react')

const config: Config = {
  // tells us where tailwind is being applied in the app
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'dark-gradient':
          'linear-gradient(to top, rgba(0,0,0,0.8), transparent)',
      },
    },
  },
  darkMode: 'class',
  plugins: [nextui()],
}
export default config
