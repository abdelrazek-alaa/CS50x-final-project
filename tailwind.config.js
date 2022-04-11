module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        spartan: ["Spartan", "sans-serif"],
      },
      colors: {
        "dark-cyan": "hsl(180, 29%, 50%)",
        "light-grayish-cyan": " hsl(180, 52%, 96%)",
        "dark-grayish-cyan": "hsl(180, 8%, 52%)",
        "very-dark-grayish-cyan": "hsl(180, 14%, 20%)",
      },
      backgroundImage: {
        desktop: "url('/public/images/bg-header-desktop.svg')",
        mobile: "url('/public/images/bg-header-mobile.svg')",
      },
    },
  },
  plugins: [],
};
