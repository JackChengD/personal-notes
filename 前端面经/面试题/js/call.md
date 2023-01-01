# call实现

fn.call(obj, args1, args2,...);  

```js
    const myCall = function(context) {
        context= context || window;
        let fn = Symbol(context);
        context[fn] = this;
        let args = [...arguments].slice(1);
        let result = context[fn](...args);
        delete context[fn];
        return result;
    }
    Function.prototype.myCall = myCall;
    const obj = {};
    function fn(source) {
        console.log(source)
    }
    fn.myCall(obj, [1, 2, 3]);
```
