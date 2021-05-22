# qiankun

qiankun是蚂蚁金服开源的基于single-spa的一个前端微服务框架。所以它解决了single-spa的一些问题。

特性：  
基于 single-spa 封装，提供了更加开箱即用的 API。  
技术栈无关，任意技术栈的应用均可 使用/接入，不论是 React/Vue/Angular/JQuery 还是其他等框架。  
HTML Entry 接入方式，让你接入微应用像使用 iframe 一样简单。  
样式隔离，确保微应用之间样式互相不干扰。  
JS 沙箱，确保微应用之间 全局变量/事件 不冲突。  
资源预加载，在浏览器空闲时间预加载未打开的微应用资源，加速微应用打开速度。  

## js沙箱(sandbox)

js沙箱是用来解决js污染的问题，所有的全局的方法（alert，setTimeout，isNaN等）、全局的变/常量（NaN，Infinity，var声明的全局变量等）和全局对象（Array，String，Date等）都属于window对象，而能导致js污染的也就是这些全局的方法和对象。  
qiankun解决js污染的方法是：在子系统加载之前对window对象做一个快照（拷贝），然后在子系统被卸载的时候恢复这个快照，既可以保证每个子系统运行的时候是一个全新的window对象环境。

## css污染问题

解决方法是，在子系统卸载的时候，将子系统引入的link、style标签移除掉。移除的办法是重写head标签的appendChild方法，方法类似定时器的重写。  
子系统加载的时候，会使用重写的appendChild将所需要的js/css插入head中，重写的appendChild会记录所插入的标签，然后子系统卸载的时候，会移除这些标签。  

## html-entry

加载子应用的静态资源，采用html-entry

## 资源预加载

参考：https://juejin.cn/post/6844904085200601102  
