import { Be_Vietnam_Pro, Inter, JetBrains_Mono } from "next/font/google";

// CSS variable names must match the --font-* tokens in app/globals.css.
export const displayFont = Be_Vietnam_Pro({
  variable: "--font-be-vietnam",
  subsets: ["latin", "vietnamese"],
  weight: ["600", "700", "800"],
});

export const bodyFont = Inter({
  variable: "--font-inter",
  subsets: ["latin", "vietnamese"],
});

export const monoFont = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin", "vietnamese"],
});

export const fontVariables = [displayFont.variable, bodyFont.variable, monoFont.variable].join(" ");
