module.exports = {
  plugins: [
    require('postcss-import'),
    require('postcss-preset-env')({
      stage: 1,
      browsers: ['last 2 versions', '> 1%']
    })
  ]
}