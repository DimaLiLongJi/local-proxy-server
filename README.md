# 脚手架及配置项说明

## 命令说明

```json
{
  "scripts": {
    "new": "node ./build/new.js",
    "start:dev": "npm run start:server & npm run start:webpack-dev",
    "start:test": "npm run start:server & npm run start:webpack-test",
    "start:prod": "npm run start:server & npm run start:webpack-prod",
    "start:win-dev": "concurrently \"npm run start:server\" \"npm run start:webpack-dev\"",
    "start:win-test": "concurrently \"npm run start:server\" \"npm run start:webpack-test\"",
    "start:win-prod": "concurrently \"npm run start:server\" \"npm run start:webpack-prod\"",
    "build:dev": "webpack -p --mode=development --env=dev",
    "build:test": "webpack -p --mode=development --env=test",
    "build:prod": "webpack -p --mode=production --env=prod",
    "start:server": "nodemon ./build/app.js",
    "start:webpack-dev": "webpack-dev-server --watch --env=dev --mode=development --progress --devtool '#source-map'",
    "start:webpack-test": "webpack-dev-server --watch --env=test --mode=development --progress --devtool '#source-map'",
    "start:webpack-prod": "webpack -p --mode=production --env=prod"
  },
}
```

- `new` 创建一个项目
- `start:dev` 启动本地开发，并开启热重载
- `build:test` `build:prod` 测试、生产模式构建打包文件


## 新建项目

1. 运行 `npm install` 安装依赖
2. 运行 `npm run new` 选择选项并创建项目
3. 按照提示 `npm run start:dev` 并打开浏览器展示项目并开启热重载


## 目录结构及说明

```
├── build 构建工具
├── public vue前台开发目录
├── static 静态资源
├── project.config.json 项目配置文件
├── webpack.config.js webpack编译器配置文件
```

### public vue前台开发目录

```
public
    ├── components 通用组件
    ├── directives 通用指令
    ├── images 图片资源
    ├── pages 多个单页项目，内部一个项目会被打包出一份代码
    ├── utils 公共方法
    ├── .eslintrc eslint配置文件
```

### static 静态资源及打包后的文件


`common` 里包含一些公共文件，例如插码文件，都直接写入模板中，无需更改

其他在该目录下**新建文件夹**，可以按照**最原始的开发模式创建项目，直接访问 `*.html` `*.js` `*.css` 这种开发模式**

```
static
|
├── demo webpack打包后的demo项目的文件夹
├── common 公共文件
├── 其他文件夹 不想写框架的直接放这里
```


## project.config.json 项目配置文件

代码示例：

```json
{
  "base": {
    "dev": {
      "base": "/frontend-test/",
      "requestBaseUrl": "https://wxxcs.hl139.net/chinamobiletest",
      "webpackPublicPath": "http://localhost:3001/static/"
    },
    "test": {
      "base": "/frontend-test/",
      "requestBaseUrl": "https://wxxcs.hl139.net/chinamobiletest",
      "webpackPublicPath": "https://wxxcs.hl139.net/frontend-test/"
    },
    "prod": {
      "base": "/frontend/",
      "requestBaseUrl": "https://139.hl139.cn/chinamobiles",
      "webpackPublicPath": "https://wxxcs.hl139.net/frontend/"
    }
  },
  "server": {
    "port": 3000,
    "hmr": {
      "port": 3001
    }
  }
}
```

### base

三种环境的编译选项与前端页面路径及请求地址，以 dev 环境举例：

```json
{
  "base": "/frontend-test/",
  "requestBaseUrl": "https://wxxcs.hl139.net/chinamobiletest",
  "webpackPublicPath": "http://localhost:3001/static/"
}
```

1. `base` 页面的前缀
2. `requestBaseUrl` 请求接口的基础地址
3. `webpackPublicPath` webpack打包的基础路径（不要改）

### server

启动项目的服务信息，可以根据实际情况修改端口信息

```json
{
 "port": 3000,
 "hmr": {
   "port": 3001
 }
}
```

1. `port` 访问页面及代理服务的端口
2. `hmr.port` 热更新的端口
