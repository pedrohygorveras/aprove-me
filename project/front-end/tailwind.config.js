/** @type {import('tailwindcss').Config} */

import daisyui from "daisyui";

export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  plugins: [
    daisyui,
    require("postcss-sorting")({
      order: [
        "custom-properties",
        "dollar-variables",
        "declarations",
        "rules",
        "at-rules",
      ],
      "properties-order": "alphabetical",
      "unspecified-properties-position": "bottom",
    }),
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", "sans-serif"],
        fira: ["Fira Sans", "sans-serif"],
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        sidebar: "var(--sidebar)",
        paper: "var(--paper)",
        input: "var(--input)",
      },
    },
  },
  daisyui: {
    themes: [
      {
        app: {
          primary: "#005eff",
          secondary: "#0a36b0",
          "--sidebar": "#0f172a",
          "--paper": "#FFFFFF",
          "--input": "#e5e7eb",
        },
        dark: {
          primary: "#005eff",
          secondary: "#0a36b0",
          "--sidebar": "#0f172a",
          "--paper": "#FFFFFF",
          "--input": "#e5e7eb",
        },
      },
    ],
  },
};
