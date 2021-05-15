const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const pages = require('./pages.js')
const plugins = pages.map(page => new HtmlWebpackPlugin({
  filename: `${page}.html`,
  template: `src/${page}.pug`,
  inject: false,
  pretty: true
}))

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.pug$/,
        use: [
          'html-loader',
          {
            loader: 'pug-html-loader',
            options: { pretty: true }
          }
        ]
      }
    ]
  },
  devServer: {
    contentBase: [ './src', './dist' ],
    compress: true,
    port: 9000,
    hot: true,
    inline: true
  },
  plugins: plugins
}