/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        Ubuntu: ["Ubuntu", "sans-serif"],
      },
      fontWeight: {
        "c-bold": 700,
        "c-semi-bold": 500,
        "c-normal": 400,
      },
      fontSize: {
        "c-sm": "16px",
      },
      colors: {
        "primary-marine-blue": "hsl(213, 96%, 18%)",
        "primary-purplish-blue": "hsl(243, 100%, 62%)",
        "primary-light-blue": "hsl(206, 94%, 87%)",
        "primary-pastel-blue": "hsl(228, 100%, 84%)",
        "primary-strawberry-red": "hsl(354, 84%, 57%)",
        "nuetral-cool-gray": " hsl(231, 11%, 63%)",
        "nuetral-light-gray": "hsl(229, 24%, 87%)",
        "nuetral-magnolia": " hsl(217, 100%, 97%)",
        "nuetral-alabaster": "hsl(231, 100%, 99%)",
        "nuetral-white": "hsl(0, 0%, 100%)",
      },
      screens: {
        xs: "375px",
      },
    },
  },
  plugins: [],
};
