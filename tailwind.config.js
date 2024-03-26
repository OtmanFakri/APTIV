/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      fontFamily: {
        "body-1-bold-font-family": "Lexend, sans-serif",
        "body-1-regular-font-family": "Lexend, sans-serif",
        "header-4-bold-font-family": "Lexend, sans-serif",
        "body-2-regular-font-family": "Lexend, sans-serif",
        "caption-regular-font-family": "Lexend, sans-serif",
        "label-regular-font-family": "Lexend, sans-serif",

      },
      fontSize: {
        "body-1-bold-font-size": "16px",
        "body-1-regular-font-size": "16px",
        "header-4-bold-font-size": "30px",
        "body-2-regular-font-size": "14px",
        "caption-regular-font-size": "12px",
        "label-regular-font-size": "11px",
      },
      fontWeight: {
        "body-1-bold-font-weight": "600",
        "body-1-regular-font-weight": "300",
        "header-4-bold-font-weight": "600",
        "body-2-regular-font-weight": "300",
        "caption-regular-font-weight": "300",
        "label-regular-font-weight": "300",
        "header-4-bold-line-height": "40px",
        "body-2-regular-line-height": "22px",
        "caption-regular-line-height": "18px",
        "label-regular-line-height": "16px",
      },
      lineHeight: {
        "body-1-bold-line-height": "24px",
        "body-1-regular-line-height": "24px",
      },
      borderRadius: {},
      colors: {
        "primary-500": "#7152f3",
        "dark-500": "#16151c",
        "gray-gray-20percent": "rgba(162, 161, 168, 0.20)",
      },
      spacing: {},
      width: {},
      minWidth: {},
      maxWidth: {},
      height: {},
      minHeight: {},
      maxHeight: {},
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}

