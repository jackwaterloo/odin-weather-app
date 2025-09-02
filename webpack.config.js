const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  devtool: 'eval-source-map',
  devServer: {
    watchFiles: ['./src/main.html'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/main.html',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'], //css loader loads the css file in js, style loader applies the css in js file
      },
    ],
  },
};
