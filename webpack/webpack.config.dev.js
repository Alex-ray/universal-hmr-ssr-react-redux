import path from 'path';
import webpack from 'webpack';
import qs from 'querystring';

const root = process.cwd();
const src  = path.join(root, 'src');

const clientSrc    = path.join(src, 'client');
const universalSrc = path.join(src, 'universal');

const clientInclude = [clientSrc, universalSrc];

const babelQuery = {
  "env": {
     "development": {
       "presets": ["react-hmre"],
       "plugins": [
         ["react-transform", {
           "transforms": [{
             "transform": "react-transform-hmr",
             "imports": ["react"],
             "locals": ["module"]
           }]
         }]
       ]
     }
   }
};


export default {
  devtool: 'eval',
  context: src,
  entry: {
    app: [
      'webpack-hot-middleware/client',
      './client/client.js'
    ]
  },
  output: {
    filename: 'app.js',
    chunkFilename: '[name]_[chunkhash].js',
    path: path.join(root, 'build'),
    publicPath: '/static/'
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      '__CLIENT__': true,
      '__PRODUCTION__': false,
      'process.env.NODE_ENV': JSON.stringify('development')
    }),
  ],
  resolve: {
    extensions: ['.js'],
    modules: [src, 'node_modules']
  },
  module: {
    loaders: [

      // Javascript
      {
        test: /\.js$/,
        loader: 'babel',
        query: babelQuery,
        include: clientInclude
      },

      // CSS
      {
       test: /\.css$/,
       include: clientInclude,
       loader: 'style-loader!css-loader?' + qs.stringify({
         modules: true,
         importLoaders: 1,
         localIdentName: '[path][name]-[local]'
       })
     }
    ]
  }
};
