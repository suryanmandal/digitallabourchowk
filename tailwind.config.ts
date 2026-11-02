import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-poppins)", "Poppins", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
        poppins: ["var(--font-poppins)", "Poppins", "sans-serif"],
      },
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
