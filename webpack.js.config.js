const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { VueLoaderPlugin, } = require('vue-loader');
const { initEntry } = require('./build/build-webpack-entry');
const HappyPack = require('happypack');
const os = require('os');
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });

module.exports = {
  name: 'vue-js',
  entry: initEntry('js'),
  output: {
    path: path.resolve(__dirname, 'static/dist'),
    filename: "[name].js",
    chunkFilename: "js.[name].[chunkhash].js",
    publicPath: '/static/dist/',
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
        include: [
          path.resolve(__dirname, 'public'),
          path.resolve(__dirname, 'project.config.json')
        ],
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
        include: [
          path.resolve(__dirname, 'public'),
          path.resolve(__dirname, 'project.config.json')
        ],
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          postcss: {},
          extractCSS: true,
        },
        include: [
          path.resolve(__dirname, 'public'),
          path.resolve(__dirname, 'project.config.json')
        ],
      },
      /** end */

      /** common bundle start */
      {
        test: [/\.js$/],
        exclude: [
          path.resolve(__dirname, 'node_modules')
        ],
        use: ['happypack/loader?id=babel']
      }, {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        loader: 'url-loader',
        include: [
          path.resolve(__dirname, 'public'),
          path.resolve(__dirname, 'project.config.json')
        ],
      }, {
        test: /\.(png|jpg|gif|svg|)$/,
        loader: 'file-loader',
        options: {
          name: 'images/[name].[ext]?[hash]',
        },
        include: [
          path.resolve(__dirname, 'public'),
          path.resolve(__dirname, 'project.config.json')
        ],
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
    }),
    new HappyPack({
      //用id来标识 happypack处理那里类文件
      id: 'babel',
      //如何处理  用法和loader 的配置一样
      loaders: [{
        loader: 'babel-loader',
        options: {
          presets: ['@babel/env'],
          plugins: [
            '@babel/plugin-transform-async-to-generator',
            '@babel/plugin-proposal-optional-chaining'
          ],
        },
      }],
      //共享进程池
      threadPool: happyThreadPool,
      //允许 HappyPack 输出日志
      verbose: true,
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
    ],
    alias: {
      '@': path.resolve(__dirname, './public/js'),
      '$root': path.resolve(__dirname, './'),
    },
  },
};