# 脚手架及配置项说明

## 命令说明

```json
{
  "scripts": {
    "new": "node ./build/new.js",
    "start": "ts-node -r tsconfig-paths/register src/main.ts & webpack --watch --mode=development --progress --devtool '#source-map'",
    "start:prod": "node dist/main.js && webpack -p --mode=production",
    "test:front": "webpack --watch --mode=development --progress --devtool '#source-map'",
    "build": "webpack -p --mode=production",
    "clean": "rm -rf static/dist dist"
  },
}
```

- `new` 创建一个项目
- `start` 启动本地开发
- `start:prod` 本地启用生产模式
- `test:front` webpack 测试本地开发模式打包
- `build` 生产模式构建打包文件
- `clean` **linux macos使用**，删除打包文件


## 新建项目

1. 运行 `npm install` 安装依赖
2. 运行 `npm run new` 选择选项并创建项目
3. 按照提示 `npm start` 并打开浏览器展示项目


## 目录结构及说明

```
├── build 构建工具
├── public vue前台开发目录
├── src node后台代码
├── static 静态资源
├── views 后台模板
├── project.config.json 项目配置文件
├── webpack.config.js webpack编译器配置文件
├── webpack.js.config.js js编译器配置文件
├── webpack.ts.config.js ts编译器配置文件
```

### public vue前台开发目录

该目录下分为2个模块，`js` 与 `ts` ，根据开发者水平自由选择

**但是 vue3.0 之后三大框架都是ts了，还是多学学ts吧大哥们**

```
public
|
├── js js开发vue
    ├── components 通用组件
    ├── images 图片资源
    ├── pages 多个单页项目，内部一个项目会被打包出一份代码
    ├── utils 公共方法
    ├── .eslintrc eslint配置文件
├── ts ts开发vue
    ├── components 通用组件
    ├── images 图片资源
    ├── pages 多个单页项目，内部一个项目会被打包出一份代码
    ├── utils 公共方法
    ├── .eslintrc eslint配置文件
```

### src 本地启动的node后台

**该目录下无需开发者修改，如有定制化功能请联系我**

```
src
|
├── api api模块及controller
├── interceptor 拦截器模块及服务
├── pages 渲染页面模块及controller
├── service 服务
├── app.module.ts 入口模块
├── main.ts main方法
```

### static 静态资源及打包后的文件

该文件夹下有个 `dist` 目录，是 `webpack` 每次打包生成的静态资源，无需更改，

`common` 里包含一些公共文件，例如插码文件，都直接写入模板中，无需更改

其他在该目录下**新建文件夹**，可以按照**最原始的开发模式创建项目，直接访问 `*.html` `*.js` `*.css` 这种开发模式**

```
static
|
├── dist webpack打包后的文件夹
├── common 公共文件
├── 其他文件夹 不想写框架的直接放这里
```


## project.config.json 项目配置文件

代码示例：

```json
{
  "server": {
    "proxy": [
      {
        "baseUrl": "/api",
        "target": "https://wxxcs.hl139.net/api",
        "commit": "友朋接口"
      }, {
        "baseUrl": "/logs",
        "target": "https://wxxcs.hl139.net/logs",
        "commit": "国杨日志"
      }
    ]
  },
  "front": {
    "router": {
      "baseUrl": "/chinamobiletest/front"
    }
  }
}
```

### server 服务端配置

`proxy` 可以是一个指向开发环境 API 服务器代理的数组：

1. `baseUrl`: 为本地请求时开头的 `path`，确定应将哪些请求代理到目标主机，例如代理 `http://localhost:3000/api` ，则可以写成 `"baseUrl": "/api"`
2. `target`: 目标主机代理到的地址，例如代理 `http://localhost:3000/api` 到生产地址 `https://wxxcs.hl139.net/api`，则可以写成 `"target": "https://wxxcs.hl139.net/api"`
3. `commit`： 注释，改代理接口是干嘛用的

注意：

当在代码中写发起的请求时，则需要写成相对url，例如实际发起请求为 `/api/gxjt/digitaluser/findTypeByMobile` ，则代码中 `url` 需要写成 `/api/gxjt/digitaluser/findTypeByMobile`

```typescript
@Component({
  components: {
    HelloWorld,
  },
})
export default class Home extends Vue {
  @PostMapping('/api/gxjt/digitaluser/findTypeByMobile')
  private getDetail!: TypeHttpRequest;

  async created() {
    const result = await this.getDetail({
      params: {
        mobile: '你的手机号'
      }
    });
    console.log(44444, result);
  }
}
```

或:

```typescript
@Component({
  components: {
    HelloWorld,
  },
})
export default class Home extends Vue {
  @PostMapping()
  private postMethod!: TypeHttpRequest;

  async created() {
    const result = await this.postMethod({
      url: '/api/gxjt/digitaluser/findTypeByMobile',
      params: {
        mobile: '你的手机号'
      }
    });
    console.log(44444, result);
  }
}
```

或:

```javascript
export default {
  name: 'home',
  components: {
    HelloWorld
  },
  async created() {
    const result = await postMethod('/api/gxjt/digitaluser/findTypeByMobile', {
      params: {
        mobile: '你的手机号'
      }
    });
    console.log(44444, result);
  }

```

### front 前端配置

`router` 是路由配置，

`baseUrl` 是 vue 路由的 `base`，假设我们配置成:

```json
{
  "front": {
    "router": {
      "baseUrl": "/chinamobiletest/front"
    }
  }
}
```

**那我们访问项目 `demo-ts` 的时候应该访问：`http://localhost:3000/chinamobiletest/front/demo-ts/`**
