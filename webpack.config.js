const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const {WebpackManifestPlugin} = require('webpack-manifest-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  watch: true,
  mode: "development",
  devtool: "cheap-module-eval-source-map",
  entry: {
    application: "./src/index.js",
    admin: "./src/admin/index.js"
  },
  output: {
    filename: "[name]-[contenthash].js",
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
    new HtmlWebpackPlugin({
      title: "My Application",
      template:"./src/temp.html",
    }),
    new WebpackManifestPlugin(),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name]-[contenthash].css'
    })
  ],
  resolve: {
    alias: {
      CssFolder: path.resolve(__dirname, 'src/assets/css')
    }
  }
}