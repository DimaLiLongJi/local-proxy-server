const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { VueLoaderPlugin, } = require('vue-loader');
const { initEntry } = require('./build/build-webpack-entry');

module.exports = {
  name: 'vue-ts',
  entry: initEntry('ts'),
  output: {
    path: path.resolve(__dirname, 'static/dist'),
    filename: "[name].js",
    chunkFilename: "ts.[name].[chunkhash].js",
    publicPath: '/dist/',
  },
  module: {
    rules: [
      /** vue bundle start */
      {
        test: /\.less$/,
        use: [
          { loader: MiniCssExtractPlugin.loader, },
          {
            loader: 'css-loader',
            options: {
              minimize: {
                safe: true,
              },
              // 自定义生成的类名
              localIdentName: '[local]_[hash:base64:8]',
            },
          }, {
            loader: 'postcss-loader',
            options: {
              plugins: [
                require('autoprefixer')(),
                require('./build/postcss-px-to-rem-vw')()
              ]
            }
          },
          'less-loader'
        ],
        include: path.resolve(__dirname, 'public/ts'),
      },
      {
        test: /\.css$/,
        use: [
          { loader: MiniCssExtractPlugin.loader },
          {
            loader: 'css-loader',
            options: {
              minimize: {
                safe: true,
              },
            },
          }, {
            loader: 'postcss-loader',
            options: {
              plugins: [
                require('autoprefixer')(),
                require('./build/postcss-px-to-rem-vw')()
              ]
            }
          },
        ],
        include: path.resolve(__dirname, 'public/ts'),
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          postcss: {},
          extractCSS: true,
        },
        include: path.resolve(__dirname, 'public/ts'),
      },
      /** end */

      /** common bundle start */
      {
        test: [/\.js$/],
        exclude: [
          path.resolve(__dirname, 'node_modules')
        ],
        loader: 'babel-loader',
        options: {
          presets: ['@babel/env'],
          plugins: [
            '@babel/plugin-transform-async-to-generator',
            '@babel/plugin-proposal-optional-chaining'
          ],
        },
      },
      {
        test: [/\.ts$/],
        exclude: [
          path.resolve(__dirname, 'node_modules')
        ],
        loader: 'ts-loader',
        options: {
          transpileOnly: true,
          appendTsSuffixTo: [
            '\\.vue$'
          ],
          configFile: path.resolve(__dirname, './public/ts/tsconfig.json')
        }
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        loader: 'url-loader',
        include: path.resolve(__dirname, 'public/ts'),
      },
      {
        test: /\.(png|jpg|gif|svg|)$/,
        loader: 'file-loader',
        options: {
          name: 'images/[name].[ext]?[hash]',
        },
        include: path.resolve(__dirname, 'public/ts'),
      }
    ],
  },
  plugins: [
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
    new webpack.ProvidePlugin({
      regeneratorRuntime: 'regenerator-runtime',
    })
  ],
  stats: {
    warningsFilter: /System.import/,
  },
  resolve: {
    extensions: [
      '.mjs',
      '.js',
      '.jsx',
      '.vue',
      '.json',
      '.ts',
      '.tsx',
    ],
    alias: {
      vue$: 'vue/dist/vue.esm.js',
      // '@': './public/ts',
    },
  },
};
