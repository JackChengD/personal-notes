# bind实现

bind方法会创建一个新函数，当这个新函数被调用时，bind的一个参数将作为它运行的this，之后的一序列参数将会在传递的实参前传入作为它的参数  
特点：返回一个函数、可以传入参数  

```js
    function myBind(context) {
        var self = this;
        let args = [...arguments].slice(1);
        function fn() {
            let brgs = [...arguments];
             // 当作为构造函数时，this 指向实例，self 指向绑定函数，因为下面一句 `bfn.prototype = this.prototype;`，已经修改了 bfn.prototype 为 绑定函数的 prototype，此时结果为 true，当结果为 true 的时候，this 指向实例。
            // 当作为普通函数时，this 指向 window，self 指向绑定函数，此时结果为 false，当结果为 false 的时候，this 指向绑定的 context。
            self.apply(this instanceof self ? this : context, brgs.concat(args));
        };
        var bfn = function() {}
        bfn.prototype = this.prototype;
        fn.prototype = new bfn();
        return fn;
    }
    Function.prototype.myBind = myBind;

```

参考：https://juejin.im/post/59093b1fa0bb9f006517b906  
