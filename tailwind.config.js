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
      },
      fontSize: {
        "body-1-bold-font-size": "16px",
        "body-1-regular-font-size": "16px",
      },
      fontWeight: {
        "body-1-bold-font-weight": "600",
        "body-1-regular-font-weight": "300",
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

