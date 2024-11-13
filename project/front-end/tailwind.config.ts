import type { Config } from "tailwindcss";

import daisyui from "daisyui";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        sidebar: "var(--sidebar)",
        paper: "var(--paper)",
        input: "var(--input)",
      },
    },
  },
  plugins: [daisyui],
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
} satisfies Config;
