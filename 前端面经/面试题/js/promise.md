# promise

## 概念

1、Promise是一个对象，如同其字面意思一样，不管怎么样都会给你一个结果，不受外界因素的影响。Promise新建后就会立即执行，其状态只能变为fullfilled或者rejected，并且已经改变不可能逆转。当我们在构造 Promise的时候，构造函数内部的代码是立即执行的。  
2、Promise的构造函数接受一个函数作为参数，该参数函数的两个参数分别为resolve和reject，其作用分别是将Promise的状态由pending转为fulfilled或者rejected，并且将成功或者失败的返回值传递出来。  
3、then有两个函数作为Promise状态改变时的回调的过程为异步操作。catch方法是对.then(null,rejectFn)封装(语法糖)。用于指定发生错误时的回调函数。  
4、一般来说，建议不要在then中定义rejected状态的回调函数，应该使用catch方法代替,这样可以处理 Promise 内部发生的错误。catch方法返回的还是一个 Promise 对象，因此后面还可以接着调用then方法。
5、race和all都是竞速函数，all结束的时间取决与那个最慢，其作为参数的Promise函数一旦有一个状态为rejected，则总的Promise的状态就为rejected；而race结束的时间取决于最快的那个，一旦最快的那个Promise状态发生改变，那么其总的Promise的状态就变成响应的状态，其余的参数Promise还是会继续进行  

为什么常说promise是微任务，其实它有可能是宏任务的，因为promise的异步任务是通过asap这个库实现的，在这个库里面我们可以看到首先是使用setImmediate的，但是这个方法只有IE110以上或者之前的EDGE才支持，所以会做兼容降级处理，导致使用process.nextTick，所以是微任务。

参考promise源码：https://github.com/then/promise/blob/91b7b4cb6a/src/core.js  
参考asap源码：https://github.com/kriskowal/asap/blob/db80ac173dbf74695ebb420f7873fe71bcb86f77/raw.js#L72  
参考：https://www.cnblogs.com/xiaonian8/p/13847393.html  

## 实现

### all方法

```js
    Promise.myAll = function (promises) {
        return new Promise((resolve, reject)=>{
            let result = [];
            let len = promises.length;
            for(let i=0;i<len;i++) {
                Promise.resolve(promises[i]).then(res => {
                    result.push(res);
                    if(result.length === len) {
                        resolve(result)
                    }
                }).catch(err => {
                    reject(err);
                });
            }
        });
    }
    let p1 = Promise.resolve(1);
    let p2 = Promise.resolve(2);
    let p3 = Promise.resolve(3);
    let promises = [p1, p2, p3];
    console.log(Promise.myAll(promises).then(res => {
        console.log(res)
    }))
```

### race方法

```js
    Promise.myRace = function(promises) {
        return new Promise((resolve, reject) => {
            promises.forEach(item=>{
                Promise.resolve(item).then(res=>{
                    resolve(res);
                }).catch(err=>{
                    reject(err);
                })
            })
        })
    }
    let p1 = new Promise((resolve)=>{
      setTimeout(()=>{
        console.log('1s');//1s后输出
        resolve(1)
      }, 1000)
    })
    let p2 = new Promise((resolve)=>{
      setTimeout(()=>{
        resolve('2s');
      },2000)
    })
    let p3 = new Promise((resolve)=>{
      setTimeout(()=>{
        resolve('5s');
      },5000)
    });
    let promises = [p1, p2, p3];
    console.log(Promise.myRace(promises));
```

```js
    async function async1() {
        console.log('async1 start'); // 2
        await async2();
        console.log('async1 end'); // 6
    }
    async function async2() {
        console.log('async2');  // 3
    }
    console.log('script start'); // 1
    setTimeout(function() {
        console.log('setTimeout');  // 8
    }, 0);
    async1();
    new Promise(function(resolve) {
        console.log('promise1');  // 4
        resolve();
    }).then(function() {
        console.log('promise2'); // 7
    });
    console.log('script end'); // 5
```

script start
async1 start
async2
promise1
script end
async1 end
promise2
setTimeout
