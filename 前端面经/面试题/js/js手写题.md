# js手写题

## 判断对象类型

```js
const isType = (type) => {
    return (target) => {
        return `[object ${type}]` === Object.prototype.toString.call(target);
    }
}

const isArray = isType('Array');
console.log(isArray([]));
```

## 循环实现map方法

```js
const myMap = function(fn, context) {
    let arr = Array.prototype.slice.call(this);
    let mapArr = new Array();
    for(let i = 0, len = arr.length; i < len; i++) {
        if (!arr.hasOwnProperty(i)) {
            continue;
        }
        mapArr[i] = fn.call(context, arr[i], i, this);
    }
    return mapArr;
}

Array.prototype.myMap = myMap;
const arr = [0,1,2,3];
console.log(arr.myMap((num) => num + 1));
console.log(arr.map((num) => num + 1));
```

## reduce实现map

```js
const myMap = function(fn, context) {
    let arr = Array.prototype.slice.call(this)
    return arr.reduce((prev, cur, index) => {
        return [...prev, fn.call(context, cur, cur[index], this)]
    }, []);
}
Array.prototype.myMap = myMap;
const arr = [0,1,2,3];
console.log(arr.myMap((num) => num + 1));
console.log(arr.map((num) => num + 1));
```

## 循环实现filter方法

```js
const myFilter = function(fn, context) {
    let arr = Array.prototype.slice.call(this);
    let filterArr = new Array();
    for(let i = 0; i< arr.length; i++) {
        if (!arr.hasOwnProperty(i)) {
            continue;
        }
        fn.call(context, arr[i], i, this) && filterArr.push(arr[i]);
    }

    return filterArr;
}

Array.prototype.myFilter = myFilter;
const arr = [0,1,2,3];
console.log(arr.myFilter((num) => num > 2));
console.log(arr.filter((num) => num > 2));

```

## reduce实现filter方法

```js
const myFilter = function(fn, context) {
    const arr = Array.prototype.slice.call(this);
    return arr.reduce((prev, cur, i) => {
        return fn.call(context, cur, i, this) ? [...prev, cur] : prev;
    }, [])
}

Array.prototype.myFilter = myFilter;
const arr = [0,1,2,3];
console.log(arr.myFilter((num) => num > 2));
console.log(arr.filter((num) => num > 2));
```

## 循环实现some方法

```js
const mySome = function(fn, context) {
    const arr = Array.prototype.slice.call(this);
    for (let i =0,len = arr.length;i<len;i++) {
        if (!arr.hasOwnProperty(i)) {
            continue;
        }
        let res = fn.call(context, arr[i], i, this);
        if (res) {
            return true;
        }
    }
    return false;
}

Array.prototype.mySome = mySome;
const arr = [0,1,2,3];
console.log(arr.mySome((num) => num > 2));
console.log(arr.some((num) => num > 2));
```

## 循环实现reduce方法

```js
const myReduce = function(fn, initialValue) {
    let arr = Array.prototype.slice.call(this);
    let result;
    let startIndex;
    if (initialValue === undefined) {
        for(let i = 0; i< arr.length; i++) {
            if (!arr.hasOwnProperty(i)) {
                continue;
            }
            startIndex = i;
            result = arr[i];
            break;
        }
    } else {
        result = initialValue;
    }
    for (let i = ++startIndex || 0; i<arr.length; i++) {
        if (!arr.hasOwnProperty(i)) {
            continue
        }
        result = fn.call(null, result, arr[i], i, this)
    }
    return result;
}
Array.prototype.myReduce = myReduce;
const arr = [0,1,2,3];
console.log(arr.myReduce((prev, cur) => prev + cur));
console.log(arr.reduce((prev, cur) => prev + cur));
```

## 使用reduce实现flat

```js
const myFlat = function(depth = 1) {
    let arr = Array.prototype.slice.call(this);
    if (depth === 0) {
        return arr;
    }
    return arr.reduce((prev, cur) => {
        if (Array.isArray(cur)) {
            return [...prev, ...myFlat.call(cur, depth - 1)]           
        }
        return [...prev, cur]
    }, [])
}

Array.prototype.myFlat = myFlat;
const arr = [0,1, [2,[3]]];
console.log(arr.myFlat(1));
console.log(arr.flat(1));

```

## 实现es6的class

```js
function inherit (children, parent) {
    children.prototype = Object.create(parent.prototype, {
        constructor: {
            enumerable: false,
            configurable: true,
            writable: true,
            value: children
        }
    })
    Object.setPrototypeOf(children, parent);
}
```

## 函数柯里化

```js
function curry(fn) {
    if (fn.length <= 1) {
        return fn;
    }
    const generator = (...args) => {
        if (fn.length === args.length) {
            return fn(...args);
        } else {
            return (...args2) => {
                return generator(...args, ...args2);
            }
        }
    }
    return generator;
}

const add = (a, b, c, d) => a + b + c + d;
const generatorCurry = curry(add);
console.log(generatorCurry(1)(2,3)(4));
console.log(generatorCurry(1)(2)(3)(4));
```

## 手写bind

```js
const isComplexDataType = obj => 
    (typeof obj === 'object' ||typeof obj === 'function') && obj !== null;

const myBind = function(bindTarget, ...args1) {
    if (typeof this !== 'function') {
        throw new TypeError('Bind must be called on a function');
    }
    const originFunc = this;
    const boundFunc = function(...args2) {
        if (new.target) {
            let result = originFunc.call(this, ...args1, ...args2);
            if (isComplexDataType(result)) {
                return result;
            }
            return this;
        } else {
            originFunc.call(bindTarget, ...args1, args2);
        }
    }
    if (originFunc.prototype) {
        boundFunc.prototype = originFunc.prototype;
    }
    const desc = Object.getOwnPropertyDescriptors(originFunc);
    Object.defineProperties(boundFunc, {
        length: desc.length,
        name: Object.assign(desc.name, {
            value: `bound ${desc.name.value}`
        })
    })
    return boundFunc;
}

const fn = function(){
    console.log(this.name);
}
const obj = {
    name: 1
}
Function.prototype.myBind = myBind;
console.log(fn.myBind(obj)())
console.log(fn.bind(obj)())
```

## 实现call方法

```js
const myCall = function(context, ...args) {
    let fn = this;
    context || (context = window);
    if (typeof fn !== 'function') {
        throw new TypeError('this is not function');
    }
    let symbol = Symbol('fn');
    context[symbol] = fn;
    result = context[symbol](...args);
    delete context[symbol];

    return result;
}


const fn = function(){
    console.log(this.name);
}
const obj = {
    name: 1
}
Function.prototype.myCall = myCall;
console.log(fn.myCall(obj))
console.log(fn.call(obj))
```

## 函数防抖

```js
/**
 * leading 为是否在进入时立即执行一次，原理是利用定时器，如果在规定时间内再次触发事件会将上次的定时器清除，即不会执行函数并重新设置一个新的定时器，直到超过规定时间自动触发定时器中的函数，同时通过闭包向外暴露了一个 cancel 函数，使得外部能直接清除内部的计数器
**/
const debounce = (func, time = 17, options = {
    leading: true,
    context: null
}) => {
    let timer;
    const _debounce = function(...args) {
        if (timer) {
            clearTimeout(timer);
        }
        if (options.leading && !timer) {
            timer = setTimeout(null, time);
            func.apply(options.context, args);
        } else {
            timer = setTimeout(() => {
                func.apply(options.context, args);
                timer = null;
            }, time)
        }
    }

    _debounce.cancel = function () {
        clearTimeout(timer);
        timer = null;
    }
    return _debounce;
}

let a = debounce(function(){
    console.log(11)
},1000)
```

## 函数节流

```js
const throttle = (func, time = 17, options = {
    leading: true,
    trailing: false,
    context: null
}) => {
    let previous = new Date(0).getTime();
    let timer;
    const _throttle = function (...args) {
        let now = new Date().getTime();
        if (!options.leading) {
            if (timer) {
                return;
            }
            timer = setTimeout(() => {
                timer= null;
                func.apply(options.context, args)
            }, time)
        } else if (now - previous > time) {
            func.apply(options.context, args);
            previous = now;
        } else if (options.trailing) {
            clearTimeout(timer);
            timer = setTimeout(() => {
                func.apply(options.context, args)
            }, time)
        }
    }
    _throttle.cancel = () => {
        previous = 0;
        clearTimeout(timer);
        timer = null;
    }
    return _throttle;
}

let a = throttle(function(){
    console.log(3213)
}, 1000)
a()
```

## 实现new关键词

```js
const isComplexDataType = obj => 
    (typeof obj === 'object' ||typeof obj === 'function') && obj !== null;

const myNew = function(fn, ...args) {
    let instance = Object.create(fn.prototype);
    let result = fn.apply(instance, args);
    return isComplexDataType(result) ? result : instance;
}
```

## 实现instanceof

```js
const myInstanceof(left, right) {
    const proto = Object.getPrototypeOf(left);
    while(true) {
        if (proto == null) {
            return false;
        }
        if (proto === right.prototype) {
            return true;
        }
        proto = Object.getPrototypeOf(proto);
    }
}
```

## 实现发布订阅EventEmitter

```js
class EventEmitter {
    constructor() {
        this.subs = {}
    }
    on(event, cb) {
        (this.subs[event] || this.sub[events] = []).push(cb);
    }
    trigger(event, ...args) {
        this.sub[event] && this.sub[event].forEach(cb => 
            cb(...args)
        )
    }
    once(event, onceCb) {
        const cb = (...args) => {
            onceCb(...args);
            this.off(event, onceCb)
        }
        this.on(event, cb);
    }
    off(event, cb) {
        if (this.sub[event]) {
            const index = this.sub[event].findIndex(item => item === cb);
            this.sub[event].splice(index, 1);
            if (!this.sub[event].length) {
                delete this.sub[event];
            }
        }
    }
}
```

参考：https://juejin.cn/post/6844903856489365518#heading-27

## 简单实现async await

```js
function myAsync(generatorFunc) {
    return function () {
        const gen = generatorFunc.apply(this, [...arguments]);

        return new Primise((resolve, reject) => {
            function step(key, arg) {
                let generatorResult;
                try {
                    generatorResult = gen[key](arg);
                } catch (error) {
                    return reject(error);
                }
                const { value, done } = generatorResult;
                if (done) {
                    return resolve(value);
                } else {
                    Promise.resolve(value)
                        .then(res => step('next', res))
                        .catch(err => step('throw', err))
                }
            }
            step('next');
        })
    }
}


function myAsync (genFn) {
    return function () {
        const gen = genFn.apply(this, [...arguments])
        return new Promise((resolve, reject) => {
            function step(key, args) {
                let genResult;
                try {
                    genResult = gen[key](args);
                } catch(error) {
                    reject(error)
                }
                const { done, value } = genResult;
                if (done) {
                    resolve(value);
                } else {
                    Promise.resolve(value)
                        .then(res => step('next', res))
                        .catch(error => step('throw', error));
                }
            }


            step('next');
        })
    }
}


```
