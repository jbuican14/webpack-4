WEBPACK 4 
Git repo :
[👉 Webpack Config ref ](https://webpack.js.org/configuration/ "Webpack configuration") 

1. need dev dependency 
node version is using 16 (18 WON"T WORK)<br>
<code>
npm install webpack@4.25.0 webpack-cli@3.1.2 --save-dev
</code>

The first thing you learn about webpack is set the 'mode' option as its fallback is 'production'
![Webpack warning mode ⚠️!](/src/assets/images/mode-warning.jpg "Webpack warning mode")<br>

<code>
node_modules/.bin/webpack --mode=production
</code>

# Bundling Command
- move our script to package.json file instead. 
<code>
  "build": "webpack --mode=production"
</code>

Separate in Multi Files is possible with import export statement or module.exports and require() statement

When create or custom your own file path instead of a hard-coded path, path should be install<br>

<code>
npm install path@0.12.7 --save-dev
</code>
<br>
<br>
We use in webpack config file as : {we named 'build' which webpack will create it} everything will be under folder NAMED 'build' from now on <br>
<code>
module.exports = {
  watch: true,
  mode: "production",
  entry: "./src/index.js",
  output: {
    filename: "../build/application.js",
    path: path.resolve(__dirname, 'build')
  }
}
</code>
<br/>
<br/>

# Loaders & Plugins
###Loaders 
Loaders tell webpack how to intepret, translate and make transformations to your code 
###Plugins can do things that loaders cannot

<br>

## Babel-Loader 
### Babel JS to transpile
webpack gives a loader called 'babel-loader' 
<code>
npm install --save-dev babel-loader@8.1.0 @babel/core@7.10.4 @babel/preset-env@7.10.4
</code>
<br />
After installing, set rules property under module in webpack config file
(see config) and here what it means:
1. '.mjs' file or '.js' files, babel-loader should apply
2. skip node-modules or bower-components
3. use -- tell webpack the name of the loader to use (some options if any) ex. presets (@babel/present-env)
4. not to remember but use docs how loader is used
<br />

### Source Map (map original source code to bundled source code)
[dev-tool for webpack](https://webpack.js.org/configuration/devtool/ "Webpack dev tool")
we use 'cheap-module-eval-source-map' 
<br/>

# CSS 
CSS Loader
<code>
npm i css-loader@3.2.0 --save-dev
</code>

## CSS to HTML 
<code>
npm i style-loader@2.0.0 --save-dev
</code>
<br/>
order is in reverse, css loader will transform our CSS into CommonJS
style-loader will inject that CSS in our page <head>
<br/>
<code>
//not using this anymore. issue with running it -- using sass-loader as dependencies instead <br />  "sass-loader": "^8.0.0" <br />
npm install node-sass@6.0.0 --save-dev --legacy-peer-deps</code>
Webpack execute from right to left
<br />
CSS prefix???
use postcss-loader
<code>
npm install postcss-loader --save-dev
</code>
<br />
## Create an external file using mini-css-extract-plugin {we also use this file ptx-ux}
<code>
npm install --save-dev mini-css-extract-plugin@0.9.0
</code>
<br />

### Minifying extracted CSS <br/> 
one module is good to use is the optimize css ! Good to use 
<code>
//require this on top of webpack config js once installed
//{we also use this file ptx-ux}
  npm i optimize-css-assets-webpack-plugin@5.0.1 --save-dev
</code>

TerserJSPlugin() wil be using with OptimizeCSSAssetsPlugin() that comes with webpack 

<br />

# Images 
Adding an image
1. add image to src/assets/images folder
2. call it from ex. scss file from src/assets/css/application.scss using url(../images/zebra-g24c3ee291_640.jpg) 
3. install --save-dev for url-loader 
4. set webpack.config.js file (see file) this case, size <=8192 bytes will be encoded as base64 and injext result 
5. even when running, it will have a different err. webpack recognize the img but img is more than the limit. err will say <b>Cannot find module ' file-loader' </b>
6. we must use another loader called file-loader (see json file) and webpack config will also specify the name attribute to pass to file-loader from url-loader (see config file)
7. bingo
NOTE: * if you don't want to turn img to inline base64 images, use directly url-loader (we can use Webpack Image Loader for fast loading)

## Compressing Images
using image-webpack-loader v.6 (if error try <code> brew install libpng </code>) 
<br />

# Cache 
### Output Files Naming 
<br/>

webpack allows more than 1 entry using object notation which will be output file names 
<br>
*we MUST update ourput from filename: "application.js" to filename: "[name].js" 
<br />

For css, we have "MiniCssExtractPlugin" that calls 
<br/>

<code>
  plugins: [
    new MiniCssExtractPlugin({
      filename: "application.css"
    })
  ]
</code>

<br />
the bundling to multiple chunks will fail on css so we need to replace filename: "application.css" to filename: "[name].css"

<br />

### Hash Content 
Adding 3 options here (file name versioning, file path versioning, or query string versioning). first option and using [name]-[contenthash].js to output and plugins config file 
<br />

We clean up build by installing clean-webpack-plugin 
<br />

The other thing is to automate the file in index.html using manifest plugin
<br >

### Manifest Plugin 
npm i webpack-manifest-plugin@4.0.0 
<br />
import as {...} = require(...)

### Alternative from Manifest is HTML webpack plugin
[HTML Webpack Plugin v.4](https://www.npmjs.com/package/html-webpack-plugin/v/4.5.2) 

# Resolving Folders
How to replace their path by aliases  and resolve modules from them 

in path module, you can load something before get anything from you modules by 

resolve {
  alias: {
    ...
  },
  modules: [path.resolve(__dirname, 'src/custom_download_libs'), 'node_modules'] 
}
// look in custom_download_libs then node_modules
// Not favorable here
<br/> The downside of using this is the chance to pewer your package manager npm or yarn 

# Webpack Dev Server and HMR (Hot Module Replacement)
- This reduce compilation, it gives an HTTP URL to access HTML page(s) not from file protocol 
// explain ::: <br/>
[contentBase] --> specify which folders used to rerve the static content
<code>
devServer: {
    port: 9000,
    contentBase: path.resolve(__dirname, 'build')
  },
</code>

Now we can set script for start with 'webpack-dev-server' 
installing npm install --save-dev webpack-cli to help wiht script 'webpack serve'
any code update, will get reload automatically
( issue : this refresh can refresh a whlole page) <br />
( solution: use Hot Module Replacement INSTEAD) <br />

### Let's talk a bit about publicPath option 

