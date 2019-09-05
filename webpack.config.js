const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { VueLoaderPlugin, } = require('vue-loader');
const { initPages } = require('./build/build-webpack-entry');

module.exports = {
  name: 'vue',
  entry: initPages(),
  output: {
    path: path.resolve(__dirname, 'public/dist'),
    filename: '[name].js',
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
          },
          'less-loader'
        ],
        include: path.resolve(__dirname, 'views'),
      },
      {
        test: /\.css$/,
        use: [
          { loader: MiniCssExtractPlugin.loader, },
          {
            loader: 'css-loader',
            options: {
              minimize: {
                safe: true,
              },
            },
          }
        ],
        include: path.resolve(__dirname, 'views'),
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          postcss: {
            plugins: [
              require('autoprefixer')({
                browsers: [
                  'Android >= 4.0',
                  'iOS >= 7.0'
                ]
              }),
              require('./build/postcss-px-to-rem-vw')()
            ]
          },
          extractCSS: true,
        },
        include: path.resolve(__dirname, 'views'),
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
      }, {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        loader: 'url-loader',
      }, {
        test: /\.(png|jpg|gif|svg|)$/,
        loader: 'file-loader',
        options: {
          name: 'images/[name].[ext]?[hash]',
        },
        include: path.resolve(__dirname, 'views'),
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
    alias: {
      vue$: 'vue/dist/vue.esm.js',
    },
  },
};