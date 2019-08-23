# 面试题--回答仅供参考
## B站
### 一面
1.基本数据类型 Symbol是什么
>- 基本的数据类型有number、string、boolean、null、undefined、Symbol
>- Symbol是ES6引入的一种新的原始数据类型，表示独一无二的值。
>Symbol()函数返回的是Symbol类型的值，该类型具有静态方法和静态属性。
>- Symbol可参考：https://www.jianshu.com/p/425148370333

2.js的深浅拷贝
1. 浅拷贝
>- 引用类型浅拷贝--地址指向相同
>- 把一个数组直接等于另一个数组，这只是把存放的地址拷贝过去，两个指向指的是同一个地址，所以在改变其中一个的值，其他的也跟着改变了。
```javascript
    var arr = [1,2,3,4,5];
    var brr = arr;
    brr[1] = 6
    console.log(arr);//[1,6,2,3,4,5]
    console.log(brr);//[1,6,2,3,4,5]
```
>- 基本数据类型浅拷贝
>- 值在内存中占据这固定大小的空间，并被保存在栈内存中。当一个变量向另一个变量复制基本类型的值，会创建这个值的副本，并且我们不能给基本类型的值添加属性
```javascript
    var a = 1;
    var b = a;
    b.name = '小明';
    console.log(a);//1
    console.log(b);//1
    console.log(b.name);//undefined
    b = 2;
    console.log(a);//1
    console.log(b);//2
```

2. 深拷贝---自身属性、方法改变互不影响
>- 将引用类型的属性、方法拷贝一份给另一个引用类型
>- 用例如下：
>- 使用数组(forEach)遍历赋值
```javascript
    var arr = [1,2,3,4,5];
    var brr = [];
    arr.forEach((item,index)=>{
        brr[index] = item;
    })
    console.log(arr);//[1,2,3,4,5]
    console.log(brr);//[1,2,3,4,5]
    brr[1]= 6;
    console.log(arr);//[1,2,3,4,5]
    console.log(brr);//[1,6,3,4,5]
```
>- 使用数组(map)遍历赋值
```javascript
    var arr = [1,2,3,4,5];
    var brr = arr.map(item=>item)
    console.log(arr);//[1,2,3,4,5]
    console.log(brr);//[1,2,3,4,5]
    brr[1]= 6;
    console.log(arr);//[1,2,3,4,5]
    console.log(brr);//[1,6,3,4,5]
```
>- 使用数组(slice)截取--不会改变原数组
```javascript
    var arr = [1,2,3,4,5];
    var brr = arr.slice(0);
    console.log(arr);//[1,2,3,4,5]
    console.log(brr);//[1,2,3,4,5]
    brr[1]= 6;
    console.log(arr);//[1,2,3,4,5]
    console.log(brr);//[1,6,3,4,5]
```
>- 使用数组(concat)合并--不会改变原数组
```javascript
    var arr = [1,2,3,4,5];
    var brr = arr.concat();
    console.log(arr);//[1,2,3,4,5]
    console.log(brr);//[1,2,3,4,5]
    brr[1]= 6;
    console.log(arr);//[1,2,3,4,5]
    console.log(brr);//[1,6,3,4,5]
```
>- 使用for-in遍历拷贝
```javascript
    var arr = [1,2,3,4,5];
    var brr = [];
    for(const key in arr){
        brr[key] = arr[key]
    }
    console.log(arr);//[1,2,3,4,5]
    console.log(brr);//[1,2,3,4,5]
    brr[1]= 6;
    console.log(arr);//[1,2,3,4,5]
    console.log(brr);//[1,6,3,4,5]
```
>- ES6语法...实现深拷贝
```javascript
    var arr = [1,2,3,4,5];
    var brr = [...arr];
    console.log(arr);//[1,2,3,4,5]
    console.log(brr);//[1,2,3,4,5]
    brr[1]= 6;
    console.log(arr);//[1,2,3,4,5]
    console.log(brr);//[1,6,3,4,5]
```

3.js怎么判断两个对象相等
>- 采用JSON.stringfy();
```javascript
    var arr = {a:1,b:2};
    var brr = {a:1,b:2};
    var crr = arr;
    console.log(arr==brr);//false 不同用这种方式判断，除非地址相同
    console.log(arr==crr);//true
    console.log(JSON.stringify(arr)==JSON.stringify(brr));//true

    //局限性--属性的顺序要求一样
    var arr = {a:1,b:2};
    var brr = {b:2,a:2};
    console.log(JSON.stringify(arr)==JSON.stringify(brr));//false
```
>- 采用for-in逐个判断--for-in会遍历原型链所有的可枚举属性
```javascript
    var arr = {a:1,b:2};
    var brr = {b:2,a:1};
    var flag = 1;
    for(const key in arr){
        if(arr[key]!==brr[key]){
            flag = 0;
            break
        }
    }
    console.log(flag?true:false);//true
```

4.移动端适配
1. viewport设置
>- 设置meta····`<meta name='viewport' content='width=device-width,initial-scale=1,user-scale=no,maximum-scale=1.0,minimum-scale=1.0'/>`
>- width设置的是layoutviewport的宽度，initial-scale设置页面的初始缩放值，并且这个初始缩放值是相遇idealviewport缩放的，最终得到的结果不仅会决定viualviewport，还会影响到layoutviewport，user-scalable是否允许用户缩放的设置
2. 小结
>- 适配不同屏幕宽度以及不同dpr，通过动态设置viewport(scale=1/dpr)+根元素+rem，辅助使用vw/vh等来达到适合的显示
>- 若无需适配可显示1px线条，也可以不动态设置scale，只使用动态设置根元素fontSize+ren+理想视口
>- 当视口缩放，计算所得的根元素fontSize也可跟着缩放，即若理想视口(scale=1)，iPhone6根元素fontSize=16px；若scale=0.5，iPhone6根元素fontSize=32px；因此不必担心rem的计算
>- !!css单位：以前我认为这样比较好：适配元素rem为单位，正文字体及边框宜用px为单位；现在认为全部使用rem即可，包括字体大小，不用px
>- px为单位的元素，需根据bpr有不同的大小，如大小12px，dpr=2则采用24px，使用sass mixin简化写法
>- 配合scss函数，简化px2rem转换，且易于维护

5.js的作用域与作用域链
1. 作用域
>- 全局作用域--在代码任何地方都能访问到的对象拥有全局作用域
>- 局部作用域--只有在固定的代码段内可以访问，函数内部，或者一些用let、const定义的变量
>- 1. 最外层函数和最外层函数外面定义的变量拥有全局作用域
```javascript
    var outVariable = '最外层变量';
    function outFun() {
      var inVariable = '内层变量';
      function innerFun() {//内层函数
        console.log(inVariable);
      }
      innerFun();
    }
    console.log(outVariable);//外层函数
    outFun();//内层变量
    console.log(inVariable);//inVariable is not defined
    innerFun();//innerFun is not defined
```
>- 2.未定义直接赋值，隐性全局变量
```javascript
    function outFun2(){
        variable = '未定义直接赋值'
        var inVariable2 = '内存变量'
    }
    outFun2();//要先支持，否则函数的内容不会创建
    console.log(variable);//未定义直接赋值
    console.log(inVariable2);//inVariable2 is not defined
```
>- 3. 所有window对象的属性拥有全局作用域
>- 例如：window.name、window.location、window.top等

>- 4. 全局作用域，函数作用域，eval作用域
```javascript
    var a = 10;//全局
    (function(){
        var b = 20;//自调用函数
    })();
    console.log(a);//10
    console.log(b);//b is not defined 
    eval("var c = 1;")//eval
    console.log(c);//1
```
>- 块级作用域
```javascript
if(true){
    let a = 1
}

for(let i=0;i<2;i++){}
console.log(a);//a is not defined
console.log(i);//i is not defined
```
2. 作用域链--内部可以访问外部，外部不能访问内部
>- 直接举例子，有点不知道怎么说
```javascript
    var outVariable = '最外层变量';
    function outFun() {//最外层函数
      var inVariable = '内层变量';
      function innerFun() {//内层函数
        console.log(inVariable);
        var tempVariable = inVariable;
      }
      innerFun()
    }
    outFun();//内层变量
    console.log(outVariable);//最外层变量
    console.log(inVariable);//inVariable is not defined
    console.log(tempVariable);//tempVariable is not defined
    //作用域链为：
    // window
    // ├──outVariable
    // └──outFun()
    // ├──inVariable
    // └──innerFun()
    //     └──tempVariable
```
3. VO(变量对象)与AO(活动对象)
>- VO用于存储执行上下文中的:1.变量，2.函数声明，3.函数参数
>- VO按照如下顺序填充:1.函数参数(若未传入，初始化该参数值为undefined)，2.函数声明(若发生命名冲突会覆盖),3.变量声明(初始化变量值为undefined，若发生命名冲突，会忽略)
```javascript
    function foo(x, y, z) {
      function x() { }
      console.log(x);
    }
    foo(100);//function x(){}

    function foo2(x, y, z) {
      var x = 50;
      console.log(x);
    }
    foo2(120);//50

    function foo3() {
      function x() { }
      var x = 100;
      console.log(x);
    }
    foo3();//100

    function foo4() {
      function x() { };
      var x;
      console.log(x)
    }
    foo4();//function x(){}
    //注：函数表达式不会影响VO
```
>- 给VO对象内的变量赋值，VO变为AO(活动对象activation object)
```javascript
    console.log(x);//function x(){}
    var x = 10;
    console.log(x);//10
    x = 20;
    function x() { }
    console.log(x);//20

    if (true) {
      var a = 1;
    } else {
      var b = 2;
    }
    console.log(a);//1
    console.log(b);//undefined
```

6.怎么判断一个对象是不是数组
1. 不能使用typeof
>- typeof返回的只有undefined、null、string、number、boolean、object、Symbol、function

2. 构造函数上判断
>- obj.constructor===Array

3. instanceof判断
>- obj instaceof Array;

4. ES5的API，Arraay.isAarry(obj)
```javascript
    var arr = [1,2,3,4];
    console.log(Array.isArray(arr));//true
```

7.js的事件循环机制(event loop)之宏任务/微任务
>- 首先要知道两点
>- JavaScript是单线程、Event Loop是JavaScript的执行机制
1. JavaScript的事件循环
>- js是单线程，任务分为同步任务和异步任务
>- 当我们打开网站时，网页的渲染过程就是一大推同步任务，比如页面骨架和页面元素的渲染。而像加载图片音乐之类占用资源大耗时久的任务，就是异步任务。
```javascript
    console.log('script start');
    setTimeout(function () {
      console.log('setTimeout');
    }, 0)

    Promise.resolve().then(function () {
      console.log('promise1');
    }).then(function () {
      console.log('promise2');
    })
    console.log('script end');
    //依次打印
    //script start,script end,promise1,promise2,setTimeout
```
>- 为什么会出现这样打印顺序
>- 1. 同步和异步任务分别进入不同的执行“场所”，同步会进入主线程，异步会进入event table并注册函数
>- 2. 当指定的事件完成时，event table会将这个函数移入Event Queue。
>- 3. 主线程内的任务执行完毕为空，会去Event Queue读取对应的函数，进入主线程执行
>- 4. 上述过程会不断重复，也就是常说的Event Loop(事件循环)
```javascript
    let data = [];
    $.ajax({
        url: www.javascript.com,
        data: data,
        success:()=>{
            console.log('发送成功')
        }
    })
    console.log('执行结束');
    //依次打印
    // ajax进入Event Table，注册回调函数success
    // 执行console.log('执行结束')
    // ajax事件完成，回调函数success进入Event Queue
    // 主线程从Event Queue读取回调函数succes并执行
```
2. 微任务(Microtasks)、宏任务(task)
>- 微任务和宏任务皆为异步任务，它们都属于一个队列，主要却别在于执行顺寻，Event Loop的走向和取值。
>- 有可执行的微任务吗？->有，执行微任务，执行完开始新的宏任务->无，开始新的宏任务
>- 宏任务一般是：包括整体代码script、setTimeout、setInterval、setlmmediate。
>- 微任务：原生Promise(有些实现的promise将then方法放到宏任务中)、process.nextTick。
























