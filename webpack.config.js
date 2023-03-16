const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
// currently clean webpack doesn't work 
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const {WebpackManifestPlugin} = require('webpack-manifest-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  // watch: true,
  mode: "development",
  devtool: "cheap-module-eval-source-map",
  devServer: {
    // contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000
  },
  entry: {
    application_juti: "./src/client/index.js",
    admi_juti: "./src/admin/index.js"
  },
  output: {
    filename: "[name]-[hash].js",
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
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          // { loader: "style-loader", options: { injectType: "styleTag" } },
          // { loader: "css-loader", options: { importLoaders: 1 } },
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
              name: './assets/images/[name].[hash:7].[ext]'
            }
          },
          {loader: 'image-webpack-loader'},
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: "My Application",
      template:"./src/temp.html",
    }),
    new WebpackManifestPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name]-[hash].css'
    })
  ],
  resolve: {
    alias: {
      css: path.resolve(__dirname, 'src/assets/css')
    },
    modules: ["node_modules"],
  }
}