# webpack学习
## 简介
>- webpack是一个现代JavaScript应用程序的静态模块打包器(module bundler)。当webpack处理应用程序时，它会递归地构建一个依赖关系图(dependency graph)，其中包括应用程序需要的每个模块，然后将所有这些模块打包成一个或多个bundle。

### 了解几个基本的概念
1.入口文件(entry)
>- 入门文件，类似于其他语言的起始文件。比如：c语言的main函数所在的文件
>- 入口起点(entry point)指示webpack应该使用哪个模块，来作为构建其内部依赖图的开始。进入入口起点后，webpack会找出哪些模块和库是入口起点(直接和间接)依赖的。
>- 可以在webpack的配置文件中配置入口，配置节点为：entry，当然可以配置一个入门，也可以配置多个。

2.输出(output)
>- output属性告诉webpack在哪里输出它所创建的bundles，以及如何命名这些文件。
```javascript
const path = require('path');
module.exports = {
    entry: './page/main.js',
    output:{
        path:path.resolve(__dirname,'dist');
        filename: 'first-webpack.bundle.js'
    }
}
```

3.loader
>- loader让webpack能够去处理那些非JavaScript文件(webpack自身只理解JavaScript)。loader可以将所有类型的文件转换为webpack能够处理的有效模块，然后你就可以利用webpack的打包能力对他们进行处理

4.插件(plugins)
>- loader被用于转换某些类型的模块，而插件可以用于执行范围更广的任务。插件的范围包括，从打包优化和压缩，一直到重新定义环境中的变量。插件接口功能极其强大，可以用来处理各种各样的任务

### webpack安装
>- 本地安装webpack(不推荐全局安装)
```
    // --save-dev 开发环境
    // --save 生产环境
    npm install --save-dev webpack
    //如果是使用webpack 4+版本，还需要安装CLI
    npm install --save-dev webpack-cli
```
参考：https://github.com/malun666/aicoder_vip_doc/blob/master/docs/pages/vip_2webpack.md





