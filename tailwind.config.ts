import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        dlc: {
          blue: "#0C59D4",
          blueDark: "#083B8F",
          blueLight: "#EEF4FF",
          navy: "#0A1E3F",
          accent: "#FF7A00",
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
