# EggJs学习

## 简介
>- egg是阿里旗下基于Node.js和Koa是一个Nodejs的企业级应用开发框架。可以帮助开发团队和开发人员降低开发和维护成本。
>- EggJs基于Es6、Es7以及Typescript、Koa2使得Node具有更规范的开发模式、更低的学习成本、更优雅的代码、更少的开发成本、更少的维护成本。为企业级框架而生。
>- 官网：https://eggjs.org/zh-cn/

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

### 基础功能
1.路由(Router)
>- Router主要用于描述请求URL和具体承担执行动作的Controlller的对应关系，框架约定了app/router.js文件用于统一所有路由规范
>- 统一的配置，可以避免路由规则逻辑散落在多个地方，从而出现未知的冲突，集中在一起我们可以更方便的来查看全局的路由规则

2.控制器(Controller)
>- Controller负责解析用户的输入，处理后返回相应的结果
>- 框架推荐Controlller层主要对用户的请求参数进行处理(校验、转换)，然后调用对应的service方法处理业务，得到业务结果后封装并返回：
>- 1. 获取用户通过HTTP传递过来的请求参数
>- 2. 校验、组装参数
>- 3. 调用Service进行业务处理，必要时处理转换Service的返回结果，让它适应用户的需求
>- 4. 通过http将结果响应给用户
>- 所有Controller都必须放在app/controller目录下，可以支持多级目录，访问的时候可以通过目录名级联访问。

3.Service(服务)
>- Service就是在复杂业务场景下用于做业务逻辑封装的一个抽象层
>- 保持Controller中的逻辑更加简介，保持业务逻辑的独立性，抽象出来的Service可以被多个Controller重复调用。
>- 将逻辑和展现分离，更容易编写测试用例
>- 负责数据的处理，比如要展现的信息需要从数据库获取，还要经过一定的规则计算，才能返回用户显示。或者计算完成后更新到数据库

4.config配置
>- 框架提供了强大且扩展的配置功能，可以自动合并、插件、框架的配置，按顺序覆盖，且可以根据环境维护不同的配置。合并后的配置可直接从app.config获取


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

3.egg-view-ejs模板引擎
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

4.egg-cors
>- 引入cors解决跨域
```javascript
    //npm i egg-cors --save

    //config/plugin.js
    exports.cors = {
        enable: true,
        package: 'egg-cors',
    };

    //config/config.default.js
    exports.security = {
        csrf: false
    };

    exports.cors = {
        origin: '*',//通配符，所有资源都可以返回
        allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH'
    };
```













