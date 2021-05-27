module.exports = {
  mode: 'jit',
  purge: [
    './src/**/*.html',
    './src/**/*.js',
    './dist/*.html'
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      'prompt': ['prompt', 'sans-serif']
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
