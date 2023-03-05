const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserJSPlugin = require('terser-webpack-plugin')

module.exports = {
  watch: true,
  mode: "development",
  devtool: "cheap-module-eval-source-map",
  entry: "./src/index.js",
  output: {
    filename: "../build/application.js",
    path: path.resolve(__dirname, 'build')
  },
  optimization: {
    minimizer: [
      new TerserJSPlugin({}),
      new OptimizeCSSAssetsPlugin({})
    ],
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          // 'style-loader',
          MiniCssExtractPlugin.loader,
          "css-loader",
          // { loader: "style-loader", options: { injectType: "styleTag" } },
          // { loader: "css-loader", options: { importLoaders: 1 } },
          // "css-loader",
          { loader: "postcss-loader", 
          options: {
            plugins: [
              require('autoprefixer')({
                overrideBrowserslist: ["last 3 versions", "ie>11"]
              })
            ]
           }},
          // "postcss-loader",
          "sass-loader"
        ],
      },
      {
        test: /\.(png|jpg|gif|svg|woff2?|eot|ttf|otf|wav)(\?.*)?$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              name: './build/assets/images/[name].[hash:7].[ext]'
            }
          },
          {loader: 'image-webpack-loader'},
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'application.css'
    })
  ]
}