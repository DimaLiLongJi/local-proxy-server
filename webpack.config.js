const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { VueLoaderPlugin, } = require('vue-loader');
const { initEntry } = require('./build/build-webpack-entry');
const HappyPack = require('happypack');
const os = require('os');
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });
const projectConfig = require('./project.config.json');
const proxyConfig = require('./proxy.config.json');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (env) => {
  const htmlWebpackPluginList = Object.keys(initEntry()).map(floder => {
    return  new HtmlWebpackPlugin({
      filename: `${floder}/index.html`,
      template: './build/index.ejs',
      inject: 'body',
      title: '加载中...',
      chunks: [floder],
      environment: projectConfig.base[env].webpackPublicPath,
    });
  });

  return {
    name: 'vue-project',
    entry: {
      // 自动构建入口
      ...initEntry(),
      // ...initEntry('js'),
      // ...initEntry('ts'),
    },
    output: {
      path: path.resolve(__dirname, 'static'),
      filename: '[name]/index.js',
      publicPath: projectConfig.base[env].webpackPublicPath,
      chunkFilename: "[name].[chunkhash].js",
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
          exclude: [
            path.resolve(__dirname, 'node_modules')
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
        }, {
          test: /\.(eot|svg|ttf|TTF|woff|woff2)$/,
          loader: 'url-loader',
          include: [
            path.resolve(__dirname, 'public'),
            path.resolve(__dirname, 'project.config.json')
          ],
        }, {
          test: /\.(png|jpg|gif|svg|)$/,
          loader: 'file-loader',
          options: {
            name(file) {
              const fileSplit = file.split('/');
              const contextProjectPath = fileSplit[fileSplit.length - 3];
              const beforeProjectPath = fileSplit[fileSplit.length - 4];
              if (beforeProjectPath === 'pages') return `${contextProjectPath}/images/[name].[ext]?[hash]`;
              else return 'images/[name].[ext]?[hash]';
            },
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
        filename: '[name]/index.css',
      }),
      new webpack.ProvidePlugin({
        regeneratorRuntime: 'regenerator-runtime',
      }),
      new webpack.DefinePlugin({
        'process.env': {
          'NODE_ENV': JSON.stringify(env),
          'config': JSON.stringify(projectConfig.base[env]),
        },
      }),
      ...htmlWebpackPluginList,
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
      }),
      // new webpack.NamedModulesPlugin(),
      // new webpack.HotModuleReplacementPlugin()
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
        '@': path.resolve(__dirname, './public'),
        '$root': path.resolve(__dirname, './'),
      },
    },
    //配置此静态文件服务器，可以用来预览打包后项目
    devServer: {
      inline: true, //打包后加入一个websocket客户端
      hot: true, //热重载
      contentBase: path.resolve(__dirname, './'), //开发服务运行时的文件根目录
      host: 'localhost', //主机地址
      // port: projectConfig.server.port, //端口号
      port: projectConfig.server.hmr.port, //端口号
      compress: true, //开发服务器是否启动gzip等压缩
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      proxy: proxyConfig
    }
  }
}
