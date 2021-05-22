# call实现

fn.call(obj, args1, args2,...);  

```js
    const myCall = function(context) {
        context= context || window;
        let fn = Symbol(context);
        context[fn] = this;
        let args = [...arguments].slice(1);
        let result = context[fn](...args);
        delete comtext[fn];
        return result;
    }
    Function.prototype.myCall = myCall;
```
