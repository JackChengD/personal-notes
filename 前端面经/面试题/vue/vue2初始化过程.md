# vue初始化过程

首先会找到入口this._init();这个方法是在initMixin(Vue)初始的。  
initMixin(Vue)会有一个自增的uid++;  
然后是一个性能的测试，这个我们可以不用管;  
判断Vue是不是一个子组件，如果是的话，做一些性能优化，将组件的配置对象上的一些深层次属性(propsData、listeners)放到vm.$options选项中，提高代码的执行效率;  
如果不是的话，那就是根组件，会做一些配置项的合并，将全局配置项合并到根组件上；  
初始代理；  
接下来是初始化过程比较重要的内容：  
initLifecycle，初始化实例关系属性$parent、$children、$refs、$root等；  
initEvents；初始化事件，比如自定义事件啥的；  
initRender；初始化插槽，解析插槽信息，得到this.$slot，处理渲染函数得到createElement，就是我们常说的h函数；  
调用生命周期函数callHook(vm,'beforeCreate');  

initInjections，初始化inject，inject会通过from找到向上找provide是谁，找不到的话就会赋值默认值，如果没有默认值就会报错，之后就是响应式处理，代理到vm上。得到ret[key] = val形式。  
initState，响应式处理，处理props、methods、data、computed、watch。  
initProvide，初始化provide，如果是函数就会执行，不是就直接赋值，然后代理到vm上，就可以通过this.xxx访问；  
调用生命周期函数callHook(vm, 'created');  

判断是否存在el，存在的时候就会自动调用$mount挂载，没有的话就必须自己调用$mount；  
进入挂载状态。  

参考：https://juejin.cn/post/6950084496515399717  
参考：https://www.bilibili.com/video/BV17i4y1A7cn  
