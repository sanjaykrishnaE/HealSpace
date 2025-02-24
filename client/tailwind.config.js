module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  theme: {
    extend: {
      colors: {
        deepBlue: '#4158d0',
        lightblue: 'var(--light-blue)',
        'bold-text-color': '#123456',
      },
      gridTemplateColumns: {
        'auto': 'repeat(auto-fill, minmax(200px, 1fr))',
       
      },
      
    },
  },
  plugins: [],
};
