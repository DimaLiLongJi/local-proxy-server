'use strict';

const express = require('express');
const path = require('path');
const projectConfig = require('../project.config.json');
const proxyConfig = require('../proxy.config.json');
const { initEntry } = require('./build-webpack-entry');
const proxy = require('http-proxy-middleware');

const app = express();

// app.use((req, res, next) => res.sendFile(path.join(__dirname, 'MP_verify_pOMwKMk4RsznX9Wn.txt')));

// ejs 相关
app.engine('.ejs', require('ejs').__express);
app.set('view engine', 'ejs');

// 静态文件
app.set('views', './build');
app.use(`${projectConfig.base.dev.base}static`, express.static('./static', {fallthrough: true}));

// 构建页面
const pageRoutes = Object.keys(initEntry()).map(path => `${projectConfig.base.dev.base}${path}`);
pageRoutes.forEach(route => {
  app.use(route, async (req, res) => {
    const reg = new RegExp(`^${projectConfig.base.dev.base}([^/?]+)[^/]*`);
    const urlPath = req.baseUrl.match(reg)[1];
    res.render('template', {
      path: urlPath,
      port: projectConfig.server.hmr.port,
    });
  });
});

// 创建代理 
if (proxyConfig) {
  // 代理注释
  // /api/foo/bar -> target: http://www.example.org ->  http://www.example.org/api/foo/bar
  // app.use('/api', proxy({target: 'http://www.example.org', changeOrigin: true}));
  Object.keys(proxyConfig).forEach(key => {
    app.use(key, proxy({ target: proxyConfig[key], changeOrigin: true }));
  })
}

app.listen(projectConfig.server.port);
console.info(`listening port ${projectConfig.server.port}.`);

exports = module.exports = app;
