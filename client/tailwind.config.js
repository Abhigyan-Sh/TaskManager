module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'txt': '#f2f2f2',
        'col-txt': '#292929',
        'medium-red': '#e83900',
        'modalBg': '#c8c8c8'
      },
      boxShadow: {
        'custom': 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
      }
    },
    fontFamily: {
      'custom1': ['Poppins'],
      'custom2': ['Silkscreen'],
      'custom3': ['Quicksand']
    },
    screens: {
      'someSize1': {'max': '1320px'},
      'someSize2': {'max': '1000px'},
      'someSize3': {'max': '735px'},
      'someSize4': {'max': '600px'},
      'someSize5': {'max': '470px'},
      'someSize6': {'max': '305px'},
    },
  plugins: [],
  }
}