import path from 'path';
import webpack from 'webpack';
import qs from 'querystring';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

const root = process.cwd();
const src  = path.join(root, 'src');
const build = path.join(root, 'build');
const universal = path.join(src, 'universal');
const server = path.join(src, 'server');

const serverInclude = [server, universal];

export default {
  context: src,
  entry: {
    prerender: 'universal/routes/index.js'
  },
  target: 'node',
  output: {
    path: build,
    chunkFilename: '[name]_[chunkhash].js',
    filename: '[name].js',
    libraryTarget: 'commonjs2',
    publicPath: '/static/'
  },
  resolve: {
    extensions: ['.js'],
    modules: [src, 'node_modules']
  },
  plugins: [
    new webpack.NoErrorsPlugin(),
    new ExtractTextPlugin('[name].css'),
    new webpack.optimize.UglifyJsPlugin({compressor: {warnings: false}}),
    new webpack.optimize.LimitChunkCountPlugin({maxChunks: 1}),
    new webpack.DefinePlugin({
      '__CLIENT__': false,
      '__PRODUCTION__': true,
      'process.env.NODE_ENV': JSON.stringify('production')
    })
  ],
  module: {
    loaders: [

      {
        test: /\.css$/,
        include: serverInclude,
        loader: ExtractTextPlugin.extract('style-loader', 'css?'+qs.stringify({
          modules: true,
          importLoaders: 1,
          localIdentName: '[name]_[local]_[hash:base64:5]'
        }))
      },

      {
        test: /\.js$/,
        loader: 'babel',
        include: serverInclude
      }

    ]
  }
};
