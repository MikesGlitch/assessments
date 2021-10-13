module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        isoblue: {
          DEFAULT: '#0167A5',
          dark: '004669',
          light: '#0098E5',
        },
        isogray: {
          DEFAULT: '#000000',
          1: '#6C6C6C',
          2: '#989898',
          3: '#E7E7E7',
          4: '#F7F7F7',
        },
        black: '#000000',
        dangerRed: '#FF0000',
        green: '#79BC43',
        lightBlue: '#D8EFFE',
        orange: '#FF9400',
        purple: '#8C75FF',
        rouge: '#D67A89',
        watermelonRed: '#F7685B',
        white: '#FFFFFF',
        yellow: '#FFB856',
      },
      spacing: {
        '10p': '10%',
        '10v': '10vw',
        '5v': '5vw',
        '5p': '5%',
      },

      height: {
        '10v': '10vh',
        '25v': '25vh',
        '50v': '50vh',
        '75v': '75vh',
        '80v': '80vh',
        '90v': '90vh',
        '100v': '100vh',
      },
      width: {
        '10v': '10vw',
        '25v': '25vw',
        '50v': '50vw',
        '75v': '75vw',
        '80v': '80vw',
        '90v': '90vw',
        '100v': '100vw',
        '80p': '80%',
        '90p': '90%',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
