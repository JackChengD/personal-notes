# EggJs学习

## 简历
>- egg是阿里旗下基于Node.js和Koa是一个Nodejs的企业级应用开发框架。可以帮助开发团队和开发人员降低开发和维护成本。
>- EggJs基于Es6、Es7以及Typescript、Koa2使得Node具有更规范的开发模式、更低的学习成本、更优雅的代码、更少的开发成本、更少的维护成本。为企业级框架而生。

### 特性
1. 提供基于Egg定制上层框架的能力
2. 高度可扩展的插件机制
3. 内置多进程管理
4. 基于Koa开发，性能优异
5. 框架稳定，测试覆盖率高
6. 渐进式开发

### 安装
1. npm i egg-init -g //创建egg的环境
2. egg-init egg-example --type=simple
3. cd egg-example 
4. npm i
5. npm run dev
注：要求nodeJs版本必须大于8.0并且要用LTS版本，文件名含有中文和空格

### MVC
>- View视图          视图 模板 页面的展示
>- Controller控制器  负责处理一些业务逻辑
>- model 模型        和数据打交道（查询数据库  请求数据）

### 用例
1.取参数
```javascript
    //router.js
    router.get('/newscontent', controller.news.content);
    
    // controller/xxx.js
    async content() {
        //获取get传值
        let query = this.ctx.query
        console.log(query)
        this.ctx.body = '新闻详情';
    }
```

2.动态路由
```javascript
    //router.js
    router.get('/newslist/:id', controller.news.newslist);

    // controller/xxx.js
    async content() {
        //获取get传值
        let query = this.ctx.query
        console.log(query)
        this.ctx.body = '新闻详情';
    }
```

3.ejs-view-ejs模板引擎
```javascript
    //安装
    //npm i egg-view-ejs --save

    // config/pulgin.js
    exports.ejs = {
        enable: true,
        package: 'egg-view-ejs'
    }
    // config/config.default.js
    config.view = {
        mapping: {
        '.html': 'ejs'
        }
    }

```














