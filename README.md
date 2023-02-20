### egg-dome

### Development

```bash
$ npm i
$ npm run dev
$ open http://localhost:7001/
```

#### 目录结构  
```
参考：https://www.eggjs.org/zh-CN/basics/structure
egg-project
├── package.json
├── app.js (可选)
├── agent.js (可选)
├── app
|   ├── router.js    用于配置 URL 路由规则
│   ├── controller   用于解析用户的输入，处理后返回相应的结果
│   |   └── home.js
│   ├── service (可选)   用于编写业务逻辑层，可选，建议使用
│   |   └── user.js
│   ├── middleware (可选)   用于编写中间件，可选
│   |   └── response_time.js
│   ├── schedule (可选)
│   |   └── my_task.js
│   ├── public (可选)      用于放置静态资源，可选
│   |   └── reset.css
│   ├── view (可选)
│   |   └── home.tpl
│   └── extend (可选)       用于框架的扩展，可选
│       ├── helper.js (可选)
│       ├── request.js (可选)
│       ├── response.js (可选)
│       ├── context.js (可选)
│       ├── application.js (可选)
│       └── agent.js (可选)
├── config                      用于编写配置文件
|   ├── plugin.js               用于配置需要加载的插件
|   ├── config.default.js
│   ├── config.prod.js
|   ├── config.test.js (可选)
|   ├── config.local.js (可选)
|   └── config.unittest.js (可选)
└── test
    ├── middleware
    |   └── response_time.test.js
    └── controller
        └── home.test.js
```

##### Egg教程
```
https://www.eggjs.org/zh-CN/intro/quickstart
```

##### egg-mongoose 教程
```
https://github.com/eggjs/egg-mongoose
http://www.mongoosejs.net/docs/guide.html
```

##### NodeJs教程
```
http://nodejs.cn/api-v16/fs.html
```


###### 相关项目  egg + mongoose
```
https://github.com/cnodejs/egg-cnode/blob/master/config/plugin.js
https://github.com/heimi-block/egg-RESTfulAPI/blob/master/app/controller/user.js
```

##### 相关项目  egg + mysql
```
https://github.com/Imfdj/vue-beehive
https://github.com/Imfdj/egg-beehive/blob/main/package.json
```




##### mongoose相关
```
修改： indByIdAndUpdate()
```