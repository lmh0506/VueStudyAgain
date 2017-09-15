const path = require('path')

module.exports = {
  entry: './src/lib/index.js',
  output: {
    path:  path.join(__dirname, 'dist'),
    filename: 'vue-toast-demo.js',
    libraryTarget: 'umd', // 指定打包的格式
    library: 'VueToastDemo'
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        exclude: /node_modules/,
        options: {
          loaders: {
            scss: 'style-loader!css-loader!sass-loader' // 从右到左解析
          }
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: path.join(__dirname, 'src'), // 只解析src下的js
        exclude: /node_modules/  // 不解析node_modules下的js
      }
    ]
  },
  plugins: [

  ]
}