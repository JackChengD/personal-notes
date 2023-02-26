# apply实现

fn.apply(obj, args);  

```js
    const myApply = function(context) {
        context = context || window;
        const fn = Symbol(context);
        context[fn] = this;
        const args = [...arguments[1]];
        const result = context[fn](...args);
        delete context[fn];
        return result;
    }
    Function.prototype.myApply = myApply;
    const obj = {};
    function fn(source) {
        console.log(source)
    }
    fn.myApply(obj, [1, 2, 3]);

```

