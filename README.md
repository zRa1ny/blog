
### 目录结构
```
    ┌─ build                          // 配置文件
    ├─ public                         // 公共资源
    ├─ server                         // 服务端
    ├─src                             // 前端
    │   ├─ api                        // 所有的api请求
    │   ├─ assets                     // 前端模板
    │   ├─ components                 // vue组件
    │   │          ├─ admin           // 后台可复用组件
    │   │          └─ global          // 前端可复用组件
    │   ├─ router                     // 前端路由
    │   ├─ store                      // vuex文件
    │   ├─ util                       // 公共函数库
    │   │    ├─ filters.js            // 过滤器函数
    │   │    └─ title.js              // 标题函数
    │   ├─ views                      // 组件库
    │   │    ├─ admin                 // 后台组件
    │   │    ├─ Article.vue           // 文章详情页
    │   │    ├─ CreateListView.js     // 预渲染
    │   │    ├─ List.Vue              // 文章列表
    │   │    └─ Login.Vue             // 登陆
    │   ├─ app.js                     // 项目入口文件
    │   ├─ App.vue                    // 全局组件
    │   ├─ entry-client.js            // 客户端渲染
    │   ├─ entry-server.js            // 服务端渲染
    │   └─ index.template.html        // 模板
    ├─ static                         // 静态文件
    ├─ .gitignore                     // git上传忽略
    ├─ pm2.yaml                       // pm2配置
    ├─ package.json                   // npm包管理
    ├─ README.md                      // 项目说明
    ├─ server.js                      // 项目启动文件
```
