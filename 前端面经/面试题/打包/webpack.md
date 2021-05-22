# webpack问题

1.webpack打包过程  
webpack可以把不同模块的文件进行打包，并且保证它们的引用正确，执行有序。

首先读取webpack的配置参数，启动webpack创建Compiler对象并开始解析项目，会根据entry找到打包的入口文件将其进行编译，最终生成依赖关系树，  
webpack默认只认识js文件，所以当打包文件中存在非js文件时，需要引入loader进行转换，loader的解析是从上往下，从右往左（style-loader(css-loader(less-loader(content)))）进行的，比如vue文件需要使用vue-loader、scss文件需要使用scss-loader、css-loader、style-loader等让webpack最终能够认识它们并解析，  
在webpack打包的构成中会通过发布订阅模式抛出一些hooks，我们可以使用plugins去监听这些hooks，在做对应的功能扩展，比如使用CopyWebpackPlugin将静态置换文件赋值到dist下面，按需引入、代码压缩（UglifyJsPlugin）、热加载、一些错误提示等。  
webpack终于会根据output确定打包的出口目录、文件格式（hash）。  

参考：https://mp.weixin.qq.com/s/bsZ3WcGFdYrGi0jXbhYl2A  

2.sourceMap是什么？  
sourceMap是一项将编译、打包、压缩的代码映射到源代码的技术，由于打包压缩后的代码并没有阅读性可言，一旦在开发中报错或者遇到问题，直接在混淆代码中debug问题会带来非常糟糕的体验，sourceMap可以帮助我们快速定位到源代码的位置，提高我们的开发效率。  

3.怎么实现一个loader？
loader本质上就是一个函数，并且不能使用箭头函数，那样会改变this的指向，函数必须返回string或者buffer，这个函数会在我们加载一些文件时执行，一般使用官网推荐的loader-untis，在webpack配置中加上resolveLoader来找自定义的loader文件，loader分同步和异步，在写法在同步使用this.callback(null, source)，异步需要通过this.async(null, source)包装。  
loader、plugin通过module.exports暴露出去  

4.怎么实现一个plugin？  
插件是通过new Plugin()形式使用的，可以确定地是plugin是一个类，并且类里面需要一个叫apply的方法，这样才能访问Compiler，这是webpack实例；核心在于，webpack打包过程中，plugin可以通过Compiler操作webpack打包过程中各个生命周期的方法，在不同时间点做一些事情。  
compiler常用的钩子有：  
run：在编译器开始读取记录前执行  
make：完成一次编译之前执行  
emit：在生成文件到output目录之前执行，回调参数： Compilation  
afterEmit：在生成文件到output目录之后执行  
done：一次编译完成后执行  

Compilation常用的钩子有：  
buildModule：在模块开始编译之前触发，可以用于修改模块  
succeedModule：当一个模块被成功编译，会执行这个钩子  

Compiler 代表了整个 Webpack 从启动到关闭的生命周期，而 Compilation 只是代表了一次新的编译，只要文件有改动，compilation就会被重新创建  

参考：https://juejin.cn/post/6844904146827476999#heading-14  
参考：https://www.cnblogs.com/etoumao/p/13496636.html