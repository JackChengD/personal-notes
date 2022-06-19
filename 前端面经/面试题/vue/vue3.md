# vue3

## 响应式

### 简单响应式demo

vue3使用Proxy实现响应式，使用bucket（桶）存储副作用函数（effect），定义需要被拦截的data，obj为需要被拦截data的代理对象，分别设get和set拦截函数，用于拦截读取和设置操作。

- 当读取时添加副作用函数，并返回对应值
- 设置时执行副作用函数

这样就可以实现一个简单响应式

```js
const bucket = new Set();
const data = { text: 'hello world' };
const obj = new Proxy(data, {
get(target, key) {
    console.log('获取值时添加副作用函数')
    bucket.add(effect);
    return target[key];
},
set(target, key, newVal) {
    console.log('设置值时执行副作用函数')
    target[key] = newVal;
    bucket.forEach(fn => fn());
    return true;
}
})

function effect() {
    document.body.innerText = obj.text;
}
effect();

setTimeout(() => {
    obj.text = 'hello vue3';
}, 1000)
```

从上面例子可以知道，一个响应式的工作流程如下：  

- 当**读取**操作发生时，将副作用函数收集到“桶”中；
- 当**设置**操作发生时，从“桶”中取出副作用函数并执行。

当时上面例子写死了副作用函数effect，如果不叫这个名字，响应式就无法正常执行。所有我们需要把它改成匿名函数的形式。

```js
let activeEffect;
function effect(fn) {
    activeEffect = fn;
    fn();
}
```

使用effect函数：

```js
effect(() => {
    document.body.innerText = obj.text;
})
```

这时候就可以通过匿名函数的形式传入到effect里面，当effect函数执行时，首先会把匿名函数的辅佐哦那个函数fn赋值到activeEffect。接着执行函数fn。这样就可以触发obj.text的读取操作，进而触发代理对象Proxy的get拦截函数：

```js
const obj = new Proxy(data, {
    get(target, key) {
        if(activeEffect) {
            bucket.add(activeEffect);
        }
        return target[key];
    },
    set(target, key, newVal) {
        target[key] = newVal;
        bucket.forEach(fn => fn());
        return true;
    }
})
```

由于副作用函数已经存储在effectEffect中，所以在get拦截函数内应该把activeEffect收集到“桶”中，这样响应式系统就不依赖副作用函数的名字了。

如果设置一个obj里面没有的属性，上面的例子是不会触发响应式的。  

```js
effect(() => {
    console.log('effect run');
    document.body.innerText = obj.text;
})

setTimeout(() => {
    obj.noExist = 'hello vue3';
}, 1000)
```

理论上，字段obj.noExist并没有与副作用函数建立响应式联系，因此定时器内的语句的执行不应该触发匿名副作用函数重新执行。但结果来看是触发了，这明显是不正确。为了解决这个问题，需要重新设计“桶”，不能简单低使用Set类型的数据作为“桶”。

按照对象的数据结构，我们应该设置一个树型的数据结构，使用 WeakMap类型来作为新的“桶”重新实现。

```js
const bucket = new WeakMap();

const obj = new Proxy(data, {
    get(target, key) {
        if(!activeEffect) return;
        let depsMap = bucket.get(target);

        if(!depsMap) {
            bucket.set(target, (depsMap = new Map()));
        }

        let deps = depsMap.get(key);

        if(!deps) {
            depsMap.set(key, (deps = new Set()));
        }

        deps.add(activeEffect);

        return target[key];
    },
    set(target, key, newVal) {
        target[key] = newVal;
        const depsMap = bucket.get(target);
        if(!depsMap) return;
        const effects = depsMap.get(key);
        const effectsToRun = new Set(effects); // 去重，防止重复执行
        effectsToRun.forEach(fn => fn());
    }
})

effect(() => {
  console.log('effect run');
  document.body.innerText = obj.text;
})

effect(() => {
  console.log('effect run');
  document.body.innerText = obj.noExist;
})
```

从这段代码可以看出构建数据结构的的方式，分别使用WeakMap,Map,Set:

- WeakMap由target --> Map构成；
- Map由key --> Set构成。

其中WeakMap的键是原始对象target，WeakMap的值是一个Map示例，而Map的键是原始对象target的key，Map的值是由一个副作用函数组成的Set。

WeakMap对key是弱引用，不影响垃圾回收器的工作。一旦key被垃圾回收器回收了，那么对应的键和值就不访问不了。所以weakMap经常用于存储那些只有当key所引用的对象存在时（没有被回收）才有价值的信息，例如上面的场景中，如果target对象没有任何引用了，说明用户侧不再需要它了，这时垃圾回收器会完成回收任务。但如果使用Map替换WeckMap，那么即使用户侧的代码对target没有任何的引用，这个target也会被回收，最终可能导致内存溢出。

最后，我们对上文中的代码做一些封装处理。在目前的实现中，当读取属性时，我们直接在get拦截函数里编写副作用函数收集到“桶”里的这部分逻辑，但更好的做法是将这部分逻辑单独封装到track函数中，函数的名字叫track是为了表达**追踪**的含义。同样，我们也可以把**触发**副作用函数重新执行的逻辑封装到trigger函数中:

```js
const obj = new Proxy(data, {
    get(target, key) {
        track(target, key);
        return target[key];
    },
    set(target, key, newVal) {
        target[key] = newVal;
        trigger(target, key)
    }
});

/**
 *  在get拦截函数内调用track函数追踪变化 
 */
function track(target, key) {
    if(!activeEffect) return;
    let depsMap = bucket.get(target);

    if(!depsMap) {
        bucket.set(target, (depsMap = new Map()));
    }

    let deps = depsMap.get(key);

    if(!deps) {
        depsMap.set(key, (deps = new Set()));
    }

    deps.add(activeEffect);
}

/**
 *  在set拦截函数内调用trigger函数执行变化
 */
function trigger(target, key) {
    target[key] = newVal;
    const depsMap = bucket.get(target);
    if(!depsMap) return;
    const effects = depsMap.get(key);
}

```

## diff算法

### 简单diff算法

渲染器的核心diff算法，简单来说，当新旧vnode的子节点都是一组节点时，为了以最小的性能开销完成更新操作，需要比较两组子节点，用于比较的算法就叫作diff算法。

```js
const oldVnode = {
    type: 'div',
    children: [
        {
            type: 'p',
            children: '1'
        },
        {
            type: 'p',
            children: '3'
        },
        {
            type: 'p',
            children: '3'
        }
    ]
}

const newVnode = {
    type: 'div',
    children: [
        {
            type: 'p',
            children: '4'
        },
        {
            type: 'p',
            children: '5'
        },
        {
            type: 'p',
            children: '6'
        }
    ]
}
```

最简单的做法，当更新子节点时，需要执行6次dom操作：

- 卸载所有的旧子节点，需要3次dom删除操作；
- 挂载所有的新子节点，需要3次dom添加操作；

但是，通过观察上面新旧vnode的子节点，可以发现：

- 更新前后的所有子节点的p标签，即标签元素不变；
- 只有p标签额度子节点（文本节点）发生变化。

所以，最理想的做法应该是直接更新p标签的文本节点的内容，这样需要3次更新操作，性能提升一倍。

```js
/**
 * n1 旧节点
 * n2 新节点
 * container 操作点
 */
function patchChildren(n1, n2, container) {
    if(typeof n2.children === 'string') {
    } else if(Array.is(n2.children)) {
        const oldChildren = n1.children;
        const newChildren = n2.children;
        for(let i=0; i<oldChild.length; i++) {
            patch(oldchildren[i], newChildren[i])
        }
    } else {}
}
```

当newChildren（多）需要挂载的时候。oldChildren（newChildren少）需要卸载的时候；

```js
function patchChildren(n1, n2, container) {
    if(typeof n2.children === 'string') {
    } else if(Array.is(n2.children)) {
        const oldChildren = n1.children;
        const newChildren = n2.children;
        const oldLen = oldChildren.length;
        const newLen = newChildren.length;
        const commonLen = Math.min(oldLen, newLen);
        for(let i=0; i<commonLen; i++) {
            patch(oldchildren[i], newChildren[i])
        }
        if(newLen > commonLen) { // 挂载
            for(let i = commonLen; i<newLen; i++) {
                patch(null, newChildren[i], container);
            }
        } else (oldLen > commonLen) { // 卸载
            for(let i = commonLen; i<oldLen; i++) {
                unmount(newChildren[i]);
            }
        }
    } else {}
}
```

如果节点只是换了位置，例如：

```js
const oldVnode = {
    type: 'div',
    children: [
        {
            type: 'p',
            key: 1,
            children: '1'
        },
        {
            type: 'p',
            key: 2,
            children: '2'
        },
        {
            type: 'p',
            key: 3,
            children: '3'
        }
    ]
}

const newVnode = {
    type: 'div',
    children: [
        {
            type: 'p',
            key: 3,
            children: '3'
        },
        {
            type: 'p',
            key: 1,
            children: '1'
        },
        {
            type: 'p',
            key: 2,
            children: '2'
        }
    ]
}
```

上面操作需要更新3次，但是如果通过换位置，只要2次

修改patchChildren函数：

```js
function patchChildren(n1, n2, container) {
    if(typeof n2.children === 'string') {
    } else if(Array.is(n2.children)) {
        const oldChildren = n1.children;
        const newChildren = n2.children;
        for(let i=0; i<newChildren.length;i++) {
            const newVNode = newChildren[i];
            for(let j=0; j<oldChildren.length; j++) {
                const oldVNode = oldChildren[i];
                // key相同说明可以复用，但仍然要调用patch函数更新
                if(newVNode.key === oldVNode.key) {
                    patch(oldNode, newVNode, container);
                }
            }
        }
    } else {}
}
```

移动代码，先将旧children数组中的索引按顺序0，1，2以此类推。  
接着，遍历新children数组如果当前索引（对应旧的索引）比最大的索引小，说明需要移动，移动到当前引用的后面。

```js
function patchChildren(n1, n2, container) {
    if(typeof n2.children === 'string') {
    } else if(Array.is(n2.children)) {
        const oldChildren = n1.children;
        const newChildren = n2.children;
        let lastIndex = 0;
        for(let i=0; i<newChildren.length;i++) {
            const newVNode = newChildren[i];
            for(let j=0; j<oldChildren.length; j++) {
                const oldVNode = oldChildren[i];
                // key相同说明可以复用，但仍然要调用patch函数更新
                if(newVNode.key === oldVNode.key) {
                    patch(oldNode, newVNode, container);
                    if(j < lastIndex) {
                        // 如果当前找到的节点在旧children中的索引小于最大索引值lastIndex，说明该节点对应的真实dom需要移动
                    } else {
                        // 如果当前找到节点在旧children中的索引不小于最大索引值，则更新lastIndex的值
                        lastIndex = j;
                    }
                    break;
                }
            }
        }
    } else {}
}
```

移动：

```js
function patchChildren(n1, n2, container) {
    if(typeof n2.children === 'string') {
    } else if(Array.is(n2.children)) {
        const oldChildren = n1.children;
        const newChildren = n2.children;
        let lastIndex = 0;
        for(let i=0; i<newChildren.length;i++) {
            const newVNode = newChildren[i];
            for(let j=0; j<oldChildren.length; j++) {
                const oldVNode = oldChildren[i];
                // key相同说明可以复用，但仍然要调用patch函数更新
                if(newVNode.key === oldVNode.key) {
                    patch(oldNode, newVNode, container);
                    if(j < lastIndex) {
                        // 如果当前找到的节点在旧children中的索引小于最大索引值lastIndex，说明该节点对应的真实dom需要移动
                        // 获取新节点的前一个节点，如果不存在，说明是第一个节点不用移动
                        const prevVNode = newChildren[i - 1];
                        if(prevVNode) {
                            // 由于我们要将newVNode对应的真实DOM移动到prevVNode所对应真实的DOM后面，所以我们需要获取prevVNode对应真实节点的下一个兄弟节点，并将其作为锚点
                            const anchor = prevVNode.el.nextSibling;
                            // 调用insert方法将newVNode对应的真实dom插入到锚点元素前面，也就是prevVNode对应真实dom的后面
                            insert(newVNode.el, container, anchor);
                        }
                    } else {
                        // 如果当前找到节点在旧children中的索引不小于最大索引值，则更新lastIndex的值
                        lastIndex = j;
                    }
                    break;
                }
            }
        }
    } else {}
}
```

新增节点：

```js
function patchChildren(n1, n2, container) {
    if(typeof n2.children === 'string') {
    } else if(Array.is(n2.children)) {
        const oldChildren = n1.children;
        const newChildren = n2.children;
        let lastIndex = 0;
        for(let i=0; i<newChildren.length;i++) {
            const newVNode = newChildren[i];
            let find = false;
            for(let j=0; j<oldChildren.length; j++) {
                const oldVNode = oldChildren[i];
                // key相同说明可以复用，但仍然要调用patch函数更新
                if(newVNode.key === oldVNode.key) {
                    // 一旦找到可复用的节点，则将变量find的值设为true
                    find = true;
                    patch(oldNode, newVNode, container);
                    if(j < lastIndex) {
                        // 如果当前找到的节点在旧children中的索引小于最大索引值lastIndex，说明该节点对应的真实dom需要移动
                        // 获取新节点的前一个节点，如果不存在，说明是第一个节点不用移动
                        const prevVNode = newChildren[i - 1];
                        if(prevVNode) {
                            // 由于我们要将newVNode对应的真实DOM移动到prevVNode所对应真实的DOM后面，所以我们需要获取prevVNode对应真实节点的下一个兄弟节点，并将其作为锚点
                            const anchor = prevVNode.el.nextSibling;
                            // 调用insert方法将newVNode对应的真实dom插入到锚点元素前面，也就是prevVNode对应真实dom的后面
                            insert(newVNode.el, container, anchor);
                        }
                    } else {
                        // 如果当前找到节点在旧children中的索引不小于最大索引值，则更新lastIndex的值
                        lastIndex = j;
                    }
                    break;
                }
            }
            // 如果代码运行到这里，find仍然是false
            // 说明当前newVNode没有在旧的一组子节点中找到可复用的节点
            // 也就是说，当前节点newVNode是新增节点，需要挂载
            if(!find) {
                const prevVNode = newChildren[i - 1];
                let anchor = null;
                // 如果有前一个vnode节点，则使用它的下一个兄弟节点作为锚点元素
                if(preVNode) {
                    anchor = prevVNode.el.nextSibling;
                } else {
                    // 如果没有前一个vnode节点，说明挂载的新节点是第一个节点，这时我们使用容器元素的firstChild作为锚点
                    anchor = container.firstChild;
                }
                // 挂载newVNode
                patch(null, newVNode, container, anchor);
            }
        }
    } else {}
}
```

移除：

```js
function patchChildren(n1, n2, container) {
    if(typeof n2.children === 'string') {
    } else if(Array.is(n2.children)) {
        const oldChildren = n1.children;
        const newChildren = n2.children;
        let lastIndex = 0;
        for(let i=0; i<newChildren.length;i++) {
        }

        // 上一步的更新操作完成后
        // 遍历旧的子节点
        for(let i=0; i< oldChilren.length; i++) {
            const oldVNode = oldChildren[i];
            // 拿旧子节点oldVNode去新的一组子节点中寻找具有相同key值的节点
            const has = newChildren.find(
                vnode => vnode.key === oldVNode.key;
            )
            if(!has) {
                // 如果没有找到具有相同key值的节点，则说明需要删除该节点
                unmount(oldVNode);
            }
        }
    } else {}
}
```

## 参考

- Vue.js源码与设计
- https://juejin.cn/post/6940454764421316644#heading-20  
