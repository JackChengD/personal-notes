# vue响应式原理

## initState

initState方法处理props、methods、data、computed、watch。  
initProps，初始化props，对props进行响应式处理，代理到vm实例上，可以通过this.propKey的方式访问；  
initMethods，初始化methods，对methods进行判重处理，不可以和props、vue实例的方法重名(_、$开头的方法)，将方法赋值到vm实例上，可以通过this.methodKey的方式访问；  
initData，初始化data，如果是函数会先执行getData方法，保证data一定是一个对象。判重处理，不可以和props、methods重名，然后将data代理到实例上，进行响应式处理；  
initComputed，初始化computed，获取computed的getter方法，然后通过watcher实例化一个computed对象，所以computed本质上也是一个watcher并且是懒执行的，computed能够缓存是因为，watcher.dirty属性，它在一次渲染中，第一次执行计算新的值后，watcher.evaluate会把dirty置为false，所以后续执行会直接取watcher.value获取，只有重新调用watcher.update时才会重新将watcher.dirty置为true。进行判重处理，不能和props、data重名，然后进行响应式处理。  
initWatch，初始化watcher，watcher的写法有很多，可以是函数、数组、字符串、对象，对每个watch会进行遍历，如果是数组会再进行for遍历，然后调用createWatcher创建，createWatcher会看是不是对象，是对象会将handler函数赋值到handler，字符串就取对应的方法赋值到handler，然后调用$watch方法。$watch会根据配置创建watcher对象，如果有immediate会自动执行一次。最后返回一个unwatchFn用来解除监听。  

## 响应式处理

响应式处理的入口是observe(vm._data)，如果vm._data不是对象就直接return，判断是否进行过响应式处理，处理过就直接用__ob__赋值，没有的话就进行响应式处理，创建一个Observer实例；  
每个Observer都会有一个Dep实例，用来做依赖收集和触发异步更新，然后会对data进行判断，如果是数组会进行数组的响应式，对数组的7个方法进行重写(push、pop、shift、unshift、splice、sort、reverse)，之后调用这7个方法是会触发notify更新操作。如果是对象，就调用this.walk(vm._data)做处理。然后会逐个遍历，调用defineReactive进行数据的双向绑定，这就是响应式原理最重要的核心。对每一个属性初始一个dep做依赖收集和触发，是通过Object.defineProperty拦截get、set方法，在get方法中会进行依赖收集dep.depend()，如果对象嵌套对象的观察者对象会进行继续收集，最后返回新的value，在set方法中，如果判断如果新得值没有发生改变就直接return，如果没有setter方法也直接return，有的话会触发，然后进行dep.notify()进行触发dep.depend收集到的所有依赖的update方法，做异步的更新操作。  

参考： https://juejin.cn/post/6950826293923414047  
参考： https://www.bilibili.com/video/BV1NK4y1K77Q  
