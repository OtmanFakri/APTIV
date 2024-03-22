/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      fontFamily: {
        "header-5-bold-font-family": "Lexend-SemiBold, sans-serif",
        "body-1-regular-font-family": "Lexend-Light, sans-serif",
      },
      fontSize: {
        "header-5-bold-font-size": "24px",
        "body-1-regular-font-size": "16px",
      },
      fontWeight: {
        "header-5-bold-font-weight": "600",
        "body-1-regular-font-weight": "300",
      },
      lineHeight: {
        "header-5-bold-line-height": "36px",
        "body-1-regular-line-height": "24px",
      },
      borderRadius: {},
      colors: {
        "dark-500": "#16151c",
        "primary-500": "#e83f25",
        "white-500": "#ffffff",
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

