# vite问题

1.与webpack的区别
webpack的两个痛点：  
1、启动的时候，需要对所有的文件进行打包导致所需要的时间较长。  
2、webpack的每次热更新，都会以当前被修改的文件作为文件的入口进行编译打包，将其涉及到的依赖重新进行一次加载。

vite借助koa启动一台静态服务器，对文件不会进行打包，服务器会根据客户端的请求加载不同的模块处理，实现真正的按需加载。  
对于热更新问题，vite采用立即编译当前修改的文件，同时还会使用http缓存、vite缓存，加载更新后的文件内容。

综上所述，vite 构建项目与 vue-cli 构建的项目在开发模式下还是有比较大的区别：  
1、Vite 在开发模式下不需要打包可以直接运行，使用的是 ES6 的模块化加载规则；Vue-CLI 开发模式下必须对项目打包才可以运行。  
2、Vite 基于缓存的热更新，Vue-CLI 基于 Webpack 的热更新。
    1. vite热更新：用过websocket连接告诉浏览器那个文件发生变化，浏览器知道哪个文件发生变化后重新请求发生变化的文件，server对请求的文件做编译，浏览器拿到相应后更新页面。
    2. webpack热更新：对修改的文件重新做编译打包，然后生成新的打包文件，通过websocket链接告诉浏览器需要更新哪些文件，浏览器收到通知后就去加载新的打包文件更新页面。
3、Vite 修改代码后只是重新请求修改部分的代码不受代码体积的影响  

2.vite打包过程  
vite利用现代浏览器原生支持ESM特性，直接在浏览器插入`<script type="module">`，省略了对模块的打包，只有具体去请求某个文件时才会按需编译，vite会根据import导入 替换路径在前面加上@modules，然后去node_modules寻找相关依赖，再分别对template、script、style进行处理；而webpack会提前把所有模块进行编译，所以随着项目越来越大，启动速度也就越慢。  

Lightning fast cold server start  - 闪电般的冷启动速度（利用浏览器原生支持模块化导入这一特性，省略了对模块的组装，也就不需要生成 bundle）  
Instant hot module replacement (HMR) - 即时热模块更换（热更新）  
True on-demand compilation - 真正的按需编译  
在开发环境下基于浏览器原生 ES imports 开发，在生产环境下基于 Rollup 打包  

参考： https://juejin.cn/post/6924997323214815240  
参考： https://juejin.cn/post/6844904197348212749  
参考： https://juejin.cn/post/6844904136299790349  
参考： https://juejin.cn/post/6881078539756503047
