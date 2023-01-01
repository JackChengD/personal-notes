# new

## new的创建过程

1、创建一个空白的对象{}  
2、为对象准备原型链接obj.__proto__ = fn.prototype  
3、重新绑定this，使构造函数的this执行新得对象fn.apply(this)  
4、为新对象赋值  
5、返回this`return this`，此时的新对象就拥有构造函数的方法和属性了。  

## 实现一个new方法

```js
    function _new(fn) {
      let obj = {
        __proto__: fn.prototype
      }
      let args = [...arguments].slice(1);
      let result = fn.apply(obj, args);
      return result instanceof Object ? result : obj;
    }
    function Person(name, age) {
      this.name = name;
      this.age = age;
    }
    Person.prototype.sayHi = function () {
      console.log(this.name)
    }
    let obj = _new(Person, '小米', 14);
    obj.sayHi();//小米
    console.log(obj);
    // person {name: "小米", age: 14}
    // age: 14
    // name: "小米"
    // __proto__:
    // sayHi: ƒ ()
    // constructor: ƒ person(name, age)
    // __proto__: Object
```

参考： https://juejin.cn/post/6964911188849197092  
