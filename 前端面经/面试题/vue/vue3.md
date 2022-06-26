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

总结：  
简单diff算法利用虚拟节点的key属性，尽可能低复用dom元素，并通过移动dom的方式来完成更新，从而减少不断地创建和销毁dom元素带来的性能开销。  

### 双端diff算法

是一种同时对新旧两组子节点的两个端点进行比较的算法。因此，需要四个索引值，分别指向新旧两组子节点的端点。  

```js
function patchKeyedChildren(n1, n2, container) {
    const oldChildren = n1.children;
    const newChildren = n2.children;
    let oldStartIdx = 0;
    let oldEndIdx = oldChildren.length - 1;
    let newStartIdx = 0;
    let newEndIdx = newChildren.length - 1;
    // 四个索引指向的vnode节点
    let oldStartVNode = oldChildren[oldStartIdx];
    let oldEndVNode = oldChildren[oldEndIdx];
    let newStartVNode = newChildren[newStartIdx];
    let newEndVNode = newChildren[newEndIdx];

    while(oldStartIdx<=oldEndIdx && newStartIdx <= newEndIdx) {
        if(oldStartVNode.key === newStartVNode.key) {
            //  旧新头key相同，只需要打补丁，不需要移动位置
            patch(oldStartVNode, newStartVNode, container);
            oldStartVNode = oldChildren[++oldStartIdx];
            newStartVNode = newChildren[++newStartIdx];
        } else if(oldEndVNode.key === newEndVNode.key) {
            //  旧新尾key相同，只需要打补丁，不需要移动位置
            patch(oldEndVNode, newEndVNode, container);
            oldEndVNode = oldChildren[--oldEndIdx];
            newEndVNode = newChildren[--newEndIdx];
        } else if(oldStartVNode.key === newEndVNode.key) {
            // 旧头新尾相同，需要打补丁和移动位置
            patch(oldStartVNode, newEndVNode, container);
            // oldStartVNode.el移动到oldEndVNode.el.nextSibling前面
            insert(oldStartVNode.el, container, oldEndVNode.el.nextSibling);
            oldStartVNode = oldChildren[++oldStartIdx];
            newEndVNode = newChildren[--newEndIdx];
        } else if(oldEndVNode.key === newStartVNode.key) {
            // 旧尾新头相同，需要打补丁和移动位置
            patch(oldEndVNode, newStartVNode, container);
            // oldEndVNode.el移动到oldStartVNode.el前面
            insert(oldEndVNode.el, container, oldStartVNode.el);
            //  移动完成后，更新索引值，并指向下一个位置
            oldEndVNode = oldChildren[--oldEndIdx];
            newStartVNode = newChildren[++newStartIdx];
        } else {
            // 其他情况
            // 遍历旧的一组子节点，试图寻找与newStartVNode拥有相同key值的节点
            // idxInOld就是新的一组子节点的头部节点在旧的一组节点中的索引
            const idxInOld = oldChildren.findIndex(
                node => node.key === newStartVNode.key
            )
            if(idxInOld > 0) {
                // idxInOld位置对应的vnode需要移动的节点
                const vnodeToMove = oldChildren[idxInOld];
                // 打补丁
                patch(vnodeToMove, newStartVNode, container);
                // 将vnodeToMove节点移动到头部节点oldStartVNode.el前面
                insert(vnodeToMove.el, container, oldStartVNode.el);
                // 由于位置idxInOld处的节点所对应的真实dom已经移动到了别处，因此将其设置为undefined
                oldChildren[idxInOld] = undefined;
                
            } else {
                // 将newStartVNode作为新节点挂载到头部，使用当前头部节点oldStartVNode.el作为锚点
                patch(null, newStartVNode, container, oldStartVNode.el);
            }
            // 最后更新newStartIdx到下一个位置
            newStartVNode = newChildren[++newStartIdx];
        }
    }
    // 循环结束后检查索引值的情况
    if(oldEndIdx < oldStartIdex && newStartIdx <= newEndIdx) {
        // 新增操作
        // 如果满足条件，则说明有新的节点遗留，需要挂载它们
        for(let i = newStartIdx; i<= newEndIdx; i++) {
            patch(null, newChildren[i], constainer, oldStartVNode.el);
        }
    } else if(newEndIdx < newStartIdx && oldStartIdx <= oldEndIdx) {
        // 移除操作
        for(let i = oldStartIdx; i<= oldEndIdx; i++) {
            unmount(oldChildren[i]);
        }
    }
}

```

总结：  
在新旧两组子节点的四端之间分别进行比较，并试图找到可复用的节点，相对简单的diff算法，双端diff算法的优势在于，对于同样的更新场景，执行的dom移动操作次数更少。  

### 快速diff算法

借鉴了纯文本diff算法中的预处理的步骤。  

```js
function patchKeyedChildren(n1, n2, container) {
    const newChildren = n2.children;
    const oldChildren = n1.children;
    // 处理相同的前置节点
    // 索引j指向新旧两组子节点的开头
    let j = 0;
    let oldVNode = oldChildren[j];
    let newVNode = newChildren[j];
    // while循环后遍历，直到遇到拥有不同key值的节点为止
    while(oldVNode.key === newVNode.key) {
        // 调用patch进行更新
        patch(oldVNode, newVNode, container);
        // 更新索引j，让其递增
        j++;
        oldVNode = oldChildren[j];
        newVNode = newChildren[j];
    }

    // 处理相同的后置节点
    // 索引oldEnd指向旧的一组子节点的最后一个节点
    let oldEnd = oldChildren.length - 1;
    // 索引newEnd指向新的一组子节点的最后一个节点
    let newEnd = newChildren.length - 1;
    oldVNode = oldChildren[oldEnd];
    newVNode = newChildren[newEnd];

    // while循环从后向前遍历，直到遇到拥有不同key值的节点为止
    while(oldVNode.key === newVNode.key) {
        // 调用patch进行更新
        patch(oldVNode, newVNode, container);
        // 递减oldEnd和newEnd
        oldEnd--;
        newEnd--;
        oldVNode = oldChildren[oldEnd];
        newVNode = newChildren[newEnd];
    }

    // 预处理完毕后，如果满足如下条件，说明j-->nextEnd之间的节点应作为新节点插入
    if(j > oldEnd && j <= newEnd) {
        // 锚点的索引
        const anchorIndex = newEnd + 1;
        // 锚点元素
        const anchor = anchorIndex < newChildren.length ? newChildren[anchorIndex].el : null;
        // 采用while循环，调用patch函数逐个挂载新增节点
        while(j <= newEnd) {
            patch(null, newChildren[j++], container, anchor)
        }
    } else if(j > newEnd && j <= oldEnd) {
        while(j <= oldEnd) {
            // j-->oldEnd之间的节点应该被卸载
            unmount(oldChildren[j++]);
        }
    } else {
        // 构造source数组
        // 新的一组子节点中剩余未处理节点的数量
        const count = newEnd - j + 1;
        // source数组将用来存储新的一组子节点中的节点在旧的一组子节点中的位置索引，后面将会使用它计算出一个最长递增子序列，并用于辅助完成DOM移动的操作。
        const source = new Array(count).fill(-1);
        // oldStart 和 newStart分别为起始索引，即j
        const oldStart = j;
        const newStart = j;

        //  新增两个变量，moved和pos
        let moved = false;
        let pos = 0;
        // 构建索引表
        const keyIndex = {};
        for(let i = newStart; i<= newEnd; i++) {
            keyIndex[newChildren[i].key] = i;
        }
        // 新增patched变量，代表更新过的节点数量
        let patched = 0;
        // 遍历旧的一组子节点
        for(let i = oldStart;i <= oldEnd; i++) {
            oldVNode = oldChildren[i];
            // 如果更新过的节点数量小于等于需要更新的节点数量，则执行更新
            if(patched <= count) {
                // 通过索引表快速找到新的一组子节点相同key值的节点位置
                const k = keyIndex[oldVNode.key];
                if(typeof k !== 'undefined') {
                    newVNode = newChildren[k];
                    // 调用patch进行更新
                    patch(oldVNode, nextVNode, container);
                    // 最后填充soutce数组
                    source[k - newStart] = i;
                    //  判断是否需要移动
                    if(k < pos) {
                        moved = true;
                    } else {
                        pos = k;
                    }
                } else {
                    // 没找到
                    unmount(oldVNode);
                }
            } else {
                // 如果更新过的节点数量大于需要更新的节点数量，则卸载多余的节点
                unmount(oldVNode);
            }
        }
        // 如果为true，则需要进行dom移动操作
        if(moved) {
            // 计算最长递增子序列
            const seq = getSequence(sources);

            let s = seq.length -1;
            let i = count - 1;
            // for循环使得i递减
            for(i; i >= 0; i--) {
                if(source[i] === -1) {
                    // 如果索引为i得节点时全新得节点，应该将其挂载
                    // 该节点在新得children中得真实位置索引
                    const pos = i + newStart;
                    const newVNode = newChildren[pos];
                    // 该节点得下一个节点得位置索引
                    const nextPos = pos + 1;
                    // 锚点
                    const anchor = nextPos < newChildren.length ? newChildren.length[nextPos].el : null;
                    // 挂载
                    patch(null, newVNode, container, anchor);
                } else if(i !== seq[s]) {
                    // 如果节点的索引i不等于seq[s]的值，说明需要移动
                    // 该节点在新得一组子节点中得真实位置索引
                    const pos = i + newStart;
                    const newVNode = newChildren[pos];
                    // 该节点的下一个节点的位置索引
                    const nextPos = pos + 1;
                    const anchor = nextPos < newChildren.length ? newChildren[nextPos].el : null;
                    // 移动
                    insert(newVNode.el, container, anchor);
                } else {
                    // 当i==seq[s]时，说明该位置的节点不需要移动
                    // 只需要让s指向下一个位置即可
                    s--;
                }
            }
        }
    }
}

function getSequence(arr) {
    const p = arr.slice();
    const result = [0];
    let i,j,u,v,c;
    const len = arr.length;
    for(i = 0;i<len;i++) {
        const arrI = arr[i];
        if(arrI !== 0) {
            j = result[result.length - 1];
            if(arr[j] < arrI) {
                p[i] = j;
                result.push(i);
                continue
            }
            u = 0;
            v = resutl.length - 1;
            while(u < v) {
                c = ((u + v) / 2) | 0;
                if(arr[result[c]] < arrI) {
                    u = c + 1;
                } else {
                    v = c;
                }
            }
            if(arrI < arr[result[u]]) {
                if(u > 0) {
                    p[i] = result [u - 1];
                }
                result[u] = i;
            }
        }
    }
    u = result.length;
    v = result[u - 1];
    while(u-- > 0) {
        result[u] = v;
        v = p[v];
    }
    return result;
}
```

总结：  

借鉴了文本diff中的预处理思路，先处理新旧两组子节点中相同的前置节点和相同的后置节点。当前置和后置节点全部处理完毕后，如果无法简单地通过挂载节点或者卸载已经不存在的节点来完成更新，则需要根据节点的索引关系，构造处一个最长递增子序列。最长递增子序列所指向的节点即为不需要移动的节点。

## 参考

- Vue.js源码与设计
- https://juejin.cn/post/6940454764421316644#heading-20  
