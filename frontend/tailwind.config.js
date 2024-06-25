/** @type {import('tailwindcss').Config} */

import { text } from "@fortawesome/fontawesome-svg-core";
import plugin from "tailwindcss/plugin";
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#F4EDEA",
        primaryDarken: "#CCC5C1",
        bgDark: "#272932",
        bgDarkSub: "#373E40",
        bgBtn: "#008BF8",
        bgBtnHover: "#0044FF",
        unleaded: "#00AF54",
        superUnleaded: "#FF312E",
        diesel: "#000103",
        superDiesel: "#FEA82F",
      },
    },
  },
  plugins: [],
};
