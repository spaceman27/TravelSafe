const env = process.env;
const NODE_ENV = process.env.NODE_ENV;
const isDev  = NODE_ENV === 'development';
const isTest = NODE_ENV === 'test';

var debug = process.env.NODE_ENV !== "production";
var webpack = require("webpack");
const path    = require('path'),
      join    = path.join,
      resolve = path.resolve;

const root  = resolve(__dirname);
const client   = join(root, 'client');
const views = join(client, 'src');
const modules = join(root, 'node_modules');

module.exports = {
  context: root,
  debug: true,
  devtool: debug? "inline-sourcemap" : null,
  entry: "./index.js",  
  output: {
    path: root,
    filename: "./bundle.js"
  },
  module: {
    loaders: [
      { 
        test: /\.js$/, 
        exclude: /node_modules/, 
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015']
        }
      },
      {
          test:   /\.css$/,
          loader: "style-loader!css-loader!postcss-loader"          
      },
      { 
        test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, 
        loader: 'url-loader?limit=100000' 
      }
    ]
  },  
  plugins: debug ? [] : [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false})
  ],
  postcss: [    
    require('autoprefixer'), 
    require('precss'),
    require('cssnano')
  ],
  externals: {
    'window.google': true
  }
}