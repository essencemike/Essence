const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const basePath = path.resolve(__dirname, '../../');

const isTravisCi = process.env.TRAVIS_CI;

const cssFilename = 'lib/css/[name].[contenthash:8].css';

const extractTextPluginOptions = { publicPath: Array(cssFilename.split('/').length).join('../') }

module.exports = {
  mode: isTravisCi ? 'development' : 'production',
  entry: {
    site: path.join(basePath, 'site'),
  },
  output: {
    path: path.resolve(basePath, 'dist/site'),
    chunkFilename: '[chunkhash:12].js',
    filename: '[chunkhash:12].js',
  },
  optimization: isTravisCi ? {} : {
    splitChunks: {
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          chunks: 'initial',
          name: 'vendors',
        },
        'async-vendors': {
          test: /[\\/]node_modules[\\/]/,
          minChunks: 2,
          chunks: 'async',
          name: 'async-vendors'
        }
      }
    },
    runtimeChunk: { name: 'runtime' }
  },
  plugins: [
    new ExtractTextPlugin({
      filename: '[chunkhash:12].css',
    }),

    new HtmlWebpackPlugin({
      template: './index.html',
      favicon: path.join(basePath, 'site/assets/favicon.ico'),
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
        // more options:
        // https://github.com/kangax/html-minifier#options-quick-reference
      },
      // necessary to consistently work with multiple chunks via CommonsChunkPlugin
      chunksSortMode: 'dependency'
    }),
  ],
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        include: [
          path.join(basePath, 'site'),
          path.join(basePath, 'src'),
          path.join(basePath, 'libs'),
        ],
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract(
          Object.assign(
            {
              fallback: {
                loader: 'style-loader',
                options: {
                  hmr: false,
                },
              },

              use: [
                {
                  loader: 'css-loader',
                  options: {
                    importLoaders: 1,
                    minimize: true,
                    sourceMap: false,
                  },
                },
                {
                  loader: 'postcss-loader',
                  options: {
                    ident: 'postcss',
                    plugins: () => [
                      require('postcss-flexbugs-fixes'),
                      require('postcss-salad')(require('../src/theme-default/salad.config.json')),
                      autoprefixer({
                        browsers: [
                          '>1%',
                          'last 4 versions',
                          'Firefox ESR',
                          'not ie < 9',
                        ],
                        flexbox: 'no-2009',
                      }),
                    ],
                  },
                },
              ],
            }, extractTextPluginOptions
          )
        ),
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(ttf|eot|svg|woff|woff2)(\?.+)?$/,
        loader: 'file-loader?name=[hash:12].[ext]'
      },
      {
        test: /\.(jpe?g|png|gif)(\?.+)?$/,
        loader: 'url-loader?name=[hash:12].[ext]&limit=25000'
      },
      {
        test: /\.md$/,
        loader: 'raw-loader',
      }
    ],
  },
};
