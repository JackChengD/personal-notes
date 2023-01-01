# practice

```js

/**
    冒泡
**/
const fn = function(arr) {
    for(let i=0;i<arr.length;i++) {
        for(let j=i+1;j<arr.length;j++) {
            if(arr[i]>arr[j]) {
                [arr[i], arr[j]] = [arr[j], arr[i]]
            }
        }
    }
    return arr;
}

let arr = [1,2,34,6,2,4,3,7,4];
console.log(fn(arr));

/**
    插入
**/

const fn = function(arr) {
    for(let i=1;i<arr.length;i++) {
        for(let j = i;j>0;j--) {
            if(arr[j-1]> arr[j]) {
                [arr[j-1], arr[j]] = [arr[j], arr[j-1]]
            }
        }
    }
    return arr;
}

let arr = [1,2,34,6,2,4,3,7,4];
console.log(fn(arr));

/**
    选择
**/

const fn = function(arr) {
    for(let i=0;i<arr.length;i++) {
        let min = i;
        for(let j=i+1;j<arr.length;j++) {
            if(arr[min] > arr[j]) {
                min = j;
            }
        }
        if(min!==i) {
            [arr[i], arr[min]] = [arr[min], arr[i]]
        }
    }
    return arr;
}

let arr = [1,2,34,6,2,4,3,7,4];
console.log(fn(arr));

/**
    快排
**/

const fn = function(arr) {
    if(arr.length<2) return arr;
    let left = 0;
    let right = arr.length-1;
    let point = arr[0];
    while(left<right) {
        while(left<right && arr[left]<=point) {
            left++;
        }
        while(left<right && arr[right]>=point) {
            right--;
        }
        [arr[left], arr[right]] = [arr[right], arr[left]];
    }
    if(arr[left]< point) {
        [arr[left], arr[0]] = [arr[0], arr[left]]
    }
    return fn(arr.slice(0, left)).concat(fn(arr.slice(left)));
}

let arr = [1,2,34,6,6,2,4,3,7,4];
console.log(fn(arr));


let xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
xhr.open('url', get, true);
xhr.send();
xhr.onreadystatechange = function() {
    if(xhr.state === 200 && xhr.readyState ===4) {
        console.log(xhr.responseText);
    }
}

const debounce = function(fn, delay = 1000) {
    let timer = null;
    return function() {
        if(timer) clearTimeout(timer);
        let args = [...arguments];
        let self = this;
        timer = setTimeout(()=>{
            fn.apply(self, args)
        }, delay);
    }
}

const throttle = function(fn, delay = 1000) {
    let flag = true;
    return function() {
        if(!flag) return;
        flag = false;
        let self =this;
        let args = [...arguments];
        setTimeout(()=>{
            fn.apply(self, args);
            flag = true;
        }, delay);
    }
}

const myNew = function(fn) {
    let obj = {
      __proto__: fn.prototype
    }
    let args = [...arguments].slice(1);
    let result = fn.apply(obj, args);
    return result instanceof Object ? result : obj;
}

const myFlat = function(arr) {
    return arr.reduce((prev, cur) => {
        return Array.isArray(cur) ? prev.concat(myFlat(cur)) : prev.concat(cur);
    }, []);
}

const myApply = function(context) {
    context = context || window;
    var fn = Symbol(context);
    context[fn] = this;
    var args = [...arguments[1]];
    var result = context[fn](...args);
    delete context[fn];
    return result;
}

const myCall = function(context) {
    context= context || window;
    let fn = Symbol(context);
    context[fn] = this;
    let args = [...arguments].slice(1);
    let result = context[fn](...args);
    delete comtext[fn];
    return result;
}

const myBind = function(context) {
    let self = this;
    let args = [...arguments].slice(1);
    let fn = function() {
        let brgs = [...arguments];
        self.apply(this instanceof self ? this : context, brgs.concat(args));
    }
    let bfn = function (){}
    bfn.prototype = this.prototype;
    fn.prototype = new bfn();
    return fn;
}

/**
  快慢指针判断链表有环
 **/
function fn(head) {
    if(!head || !head.next) return false;
    var slow = head;
    var fast = head.next;
    while(fast && fast.next) {
        if(slow === fast) return true;
        slow = slow.next;
        fast = fast.next.next;
    }
    return false;
}

// 单行截断
// white-space: nowrap;
// overflow: hidden;
// text-overflow: ellipsis;

// 多行截断
// display: -webkit-box;
// overflow: hidden;
// -webkit-line-clamp: 2;
// -webkit-box-orient: vertical;

function sleep(delay) {
    return new Promise(resolve =>{
        setTimeout(resolve, delay)
    })
}

sleep(1000).then(()=>{
    console.log(111);
})

const myTrim = function(str) {
    return str.replace(/(^\s*) | (\s*$)/g, '');
}

const fixAddNumber = function(a, b) {
    return parseFloat((a+b).toFixed(10));
}

/**
    event.target指向引起触发事件的元素，而event.currentTarget则是事件绑定的元素，只有被点击的那个目标元素的event.target才会等于event.currentTarget。
**/

const myAll = function(promises) {
    return new Promise((resolve, reject)=>{
        let result = [];
        let len = promises.length;
        promises.forEach(item => {
            Promise.resolve(item).then(res=>{
                result.push(res);
                if(result.length === len) {
                    resolve(result);
                }
            }).catch(err => {
                reject(err);
            })
        })
    })
}

const myRace = function(promises) {
    return new Promise((resolve, reject)=>{
        promises.forEach(item => {
            Promise.resolve(item).then(res=>{
                resolve(res);
            }).catch(err=>{
                reject(err);
            })
        })
    })
}

const myInstanceof = function(left, right) {
    let leftPro = left.__proto__;
    let rightPro = right.prototype;
    while(true) {
        if(!leftPro) return false;
        if(leftPro === rightPro) return true;
        leftPro = leftPro.__proto__;
    }
}

/**
    sum(1, 2, 3).sumOf(); //6
    sum(2, 3)(2).sumOf(); //7
    sum(1)(2)(3)(4).sumOf(); //10
    sum(2)(4, 1)(2).sumOf(); //9
**/

const sum = function() {
    let args = [...arguments];
    let result = function() {
        args.push(...arguments);
        return result;
    }

    result.sumOf = function() {
        return args.reduce((prev, cur) => prev + cur, 0)
    }

    return result;
}

/**
    使用reduce方法实现map方法的polyfill
**/

Array.prototype.myMap = function(fn) {
    let arr = this;
    return arr.reduce((prev, cur, i)=>{
        return prev.concat(fn.call(arr, cur, i, arr));
    }, []);
}


let arr = [1,2,3];
arr.myMap((item, i, brr)=> {
        console.log(i, brr);
        return item *2;
    }
);

/**
    每个wait调用func，times次
**/

const repeat = function(fn, times, wait) {
    return function() {
        let count = 0;
        let timer = setInterval(()=>{
            fn.call(this, ...arguments);
            count++;
            if(count === times) {
                clearInterval(timer);
            }
        }, wait);
    }
}


// 需要实现的函数
function repeat (func, times, wait) {}，
// 使下面调用代码能正常工作
const repeatFunc = repeat(console.log, 4, 3000);
repeatFunc("hellworld");//会输出4次 helloworld, 每次间隔3秒

function Person(name, age) {
    this.name = name;
    this.age = age;
}

Person.prototype.sayHi = function() {
    console.log(this.name);
}

function Student(name, age, weight) {
    Person.call(this, name, age);
    this.weight= weight;
}

Student.prototype = new Person();
Student.prototype.constructor = Student; // 修改原型指向

/**
    深拷贝
**/
const myCloneDeep = function(source) {
    let result;
    if(typeof source === 'object') {
        result = Array.isArray(source) ? [] : {}
        for(let key in source) {
            if(typeof source[key] === 'object') {
                result[key] = myCloneDeep(source[key]);
            } else {
                result[key] = source[key];
            }
        }
    } else {
        result = source;
    }
    return result;
}
let obj1 = {
    age: 1,
    name: '达撒',
    say: ['aaa', 'bbb'],
    hi: {
    age: 22,
    name: "打"
    }
}

console.log(myCloneDeep(obj1));

/**
    jsonp
**/

let script = document.createElement('script');
script.type = 'text/javascript'
script.src = 'https://www.xxxx.com/callback=fn';
document.head.appendChild(script);

function fn() {
    console.log(111);
}

/**
    千分符
**/

const fn = function(str) {
    let result = '';
    while(str.length>3) {
        result = ',' + str.slice(-3) + result;
        str = str.slice(0, -3);
    }
    if(str) {
        result = str + result;
    }
    return result;
}

console.log(fn('12321321321'));

/**
    indexOf实现
**/

const myIndexOf = function(source, target) {
    let targetLen = target.length;
    let sourceLen = source.length;
    for(let i=0;i<= sourceLen - targetLen;i++) {
        const cur = source.slice(i, i+targetLen);
        if(cur === target) {
            return i;
        }
    }
    return -1;
}
console.log(myIndexOf('13213213321', '321'));

/**
    层次遍历
**/

const fn = function(root) {
    let result = [];
    let queue = [];
    let head;
    if(!root) return;
    queue.push(root);
    while(queue.length) {
        head = queue.shift();
        result.push(head.val);
        if(head.left) queue.push(head.left);
        if(head.right) queue.push(head.right);
    }
    return result;
}

/**
    发布订阅模式
**/

class Subscriber {
    constructor() {
        this.observers = [];
    }

    add(observer) {
        this.observers.push(observer);
    }

    notify() {
        this.observers.forEach(item => {
            item.sayHi();
        })
    }

    remove(observer) {
        this.observers = this.observers.filter(item => item !== observer);
    }
}

class Observer {
    constructor(name) {
        this.name = name;
    }
    sayHi() {
        console.log(`我是${this.name}`);
    }
}

const sub = new Subscriber();
const jack = new Observer('jack');
const amy = new Observer('amy');
const john = new Observer('john');
sub.add(jack);
sub.add(amy);
sub.add(john);
sub.notify();
sub.remove(jack);
sub.notify();


class Bus {
    constructor() {
        this.callbacks = {};
    }
    $on(name, fn) {
        this.callbacks[name] = this.callbacks[name] || [];
        this.callbacks[name].push(fn);
    }
    $emit(name) {
        let args = [...arguments].slice(1)
        if(this.callbacks[name]) {
            this.callbacks[name].forEach(cb => cb(args));
        }
    }
    $off(name) {
        if(this.callbacks[name]) {
            delete this.callbacks[name];
        }
    }
}


/**
  数组旋转90度
  解法是先对角交换，再逆序
  [
    [1, 2, 3, 4],
    [5, 6, 7, 8],
    [9, 10, 11, 12],
    [13, 14, 15, 16]
  ]

  =>

  [
    [1, 5, 9, 13],
    [2, 6, 10, 14],
    [3, 7, 11, 15],
    [4, 8, 12, 16]
  ]

  =>

  [
    [13, 9, 5, 1],
    [14, 10, 6, 2],
    [15, 11, 7, 3],
    [16, 12, 8, 4]
  ]
**/

const fn = function(arr) {
    let x = arr.length;
    let y = arr[0].length;

    for(let i=0;i<x;i++){
        for(let j=i;j<y;j++) {
            [arr[i][j], arr[j][i]] = [arr[j][i], arr[i][j]]
        }
    }

    for(let i=0;i<x;i++) {
        for(let j=0;j<y/2;j++) {
            [arr[i][j], arr[i][y-j-1]] = [arr[i][y-j-1], arr[i][j]];
        }
    }
}

console.log(fn([[1, 2, 3, 4],[5, 6, 7, 8], [9, 10, 11, 12], [13, 14, 15, 16]]))

/**
  乱序数组中找比左边都小比右边都大的数
  两次遍历，记录左边最大值，右边用新数组记录每个点（从右往左）的最小值
  从右往左找，找到每个位置的最小值并记录起来
  从左往右找，当前值大于左边最大值，更新左边最大值，再看当前值是否小于（右边过来的数组）索引下一个小
  如果是，那么当前是就是比左边都小比右边都大的数
**/
const fn = function(arr) {
  let result = [];
  let arrLen = arr.length;
  let leftMax = arr[0];
  let rightMin = arr[arrLen-1];
  let rightArr = new Array(arrLen);

  for(let i=arrLen-1;i>=0;i--) {
    if(arr[i] < rightMin) {
      rightMin = arr[i];
    }
    rightArr[i] = rightMin;
  }

  // 第一个和最后一个不用看
  for(let i=1;i<arrLen-1;i++) {
    if(arr[i]>leftMax) {
      leftMax = arr[i];
      if(arr[i] < rightArr[i+1]) {
        result.push(arr[i])
      }
    }
  }

  return result;
}

console.log(fn([1,2,3,7,4,5,6]))

// 题源：https://leetcode-cn.com/circle/discuss/q5wVRM/

/**
  num是否为source的倍数或者包含source
**/
const fn = function(num, source) {
  if(num % source === 0) return true;
  let numStr = num + '';
  if(numStr.indexOf(source)> -1) return true;
  return false
}

/**
  生成n到m的随机数
**/

const fn = function(n, m) {
  return Math.floor(Math.random()*(m - n + 1)) + n;
}

console.log(fn(3, 7));

const fn = function(num, source) {
    if(num % source === 0) return true;
    num +='';
    if(num.indexOf(source)>-1) return true;
    return false;
}

console.log(fn(3, 7));

const fn = function(num) {
    let result = 0;
    while(num!==0) {
        num&=num-1;
        result++;
    }
    return result;
}

function fn(array, id, pid) {
    let map = {};
    let result = {};
    for(let i=0;array.length;i+) {
        map[array[i].id] = array[i];
    }

    array.forEach(item => {
        const parent = map[item.pid];
        if(parent) {
            if(!parent.children) {
                parent.children = []
            }
            parent.children.push(item)
        } else {
            result = item;
        }
    })
    return result;
}

```


```js
const fn = function(arr) {
    for(let i =0;i<arr.length;i++) {
        for(let j = i+1;j<arr.lengtj;j++) {
            if(arr[i] > arr[j]) {
                [arr[i], arr[j]] = [arr[j], arr[i]]
            }
        }
    }
    return arr;
}

const fn = function(arr) {
    for(let i=1;i<arr.length;i++) {
        for(let j = i;j<0;j--) {
            if(arr[j-1] > arr[j]) {
                [arr[j-1], arr[j]] =[arr[j], arr[j-1]];
            }
        }
    }
    return arr;
}

const fn = function(arr) {
    for(let i=0;i<arr.length;i++) {
        let min = i;
        for(let j = i+1;j<arr.length;j++) {
            if (arr[min] > arr[j]) {
                min = j;
            }
        }
        if (min !== i) {
            [arr[i], arr[min]] = [arr[min], arr[i]]
        }
    }
    return arr;
}

const fn = function(arr) {
    if (arr.length <2) {
        return arr;
    }
    let left = 0;
    let right = arr.length -1;
    let point = arr[i];
    while(left < right) {
        while(left < right && arr[left] <= point) {
            left++;
        }
        while(left < right && arr[right] >= point) {
            right--;
        }
        [arr[left], arr[right]] = [arr[right], arr[left]]
    }
    if (arr[left] < point) {
        [arr[left], arr[0]] = [arr[0], arr[left]]
    }
    return fn(arr.slice(0, left)).concat(fn(arr.slice(left)));
}

let xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
xhr.open('url', get, true);
xhr.send();
xhr.onreadystatechange = function() {
    if (xhr.state === 200 && xhr.readyState === 4) {
        console.log(xhr.responeseText);
    }
}

const debounce = function(fn, delay = 1000) {
    let timer = null;
    return function() {
        if(timer) {
            clearTimtout(timer);
        }
        let args = [...arguments];
        let self = this;
        timer = setTimeout(() => {
            fn.apply(self, args);
        }, delay);
    }
}

const throttle = function(fn, delay = 1000) {
    let flag = true;
    return function () {
        if(!flag) {
            return
        }
        flag = false;
        let self = this;
        let arg = [...arguments];
        setTimeout(() => {
            fn.apply(self, args);
            flag = true;
        }, delay)
    }
}

const myNew = function(fn) {
    let obj = {
        __proto__: fn.prototype
    }
    let args = [...arguments].slice(1);
    let result = fn.apply(obj. args);
    return result instanceof Object ? result : obj;
}

const myFlat = function(arr) {
    return arr.reduce((prev, cur) => {
        return Array.isArray(cur) ? prev.concat(myFlat(cur)) : prev.concat(cur);
    }, [])
}

const myApply = function(context) {
    context = context || window;
    let fn = Symbol(context);
    context[fn] = this;
    let args = [...arguments[1]];
    let result = context[fn](...args);
    delete context[fn];
    return result;
}

const myBind = function(context) {
    let self = this;
    let args = [...arguments].slice(1);
    let fn = function() {
        let brgs = [...arguments];
        self.apply(this instanceof self ? this : context, brgs.concat(args));
    }
    let bfn = function() {}
    bfn.prototype = this.prototype;
    fn.prototype = new bfn();
    return fn;
}

const fn = function(head) {
    if (!head || !head.next) return false;
    let slow = head;
    let fast = head.next;
    while(fast && fast.next) {
        if (slow === fast) {
            return true;
        }
        slow = slow.next;
        fast = fast.next.next;
    }
    return false;
}

const sleep = function(delay) {
    return new Promise(resolve => {
        setTimeout(resolve, delay)
    })
}

sleep(1000).then(res => {
    console.log(11)
})

const myTrim = function(str) {
    return str.replace(/(^\s*) | (\s*$)/g, '');
}

const fixAddNumber = function(a,b) {
    return parseFloat((a+b).toFixed(10));
}

const myAll = function(pomises) {
    return new Promise((resolve, reject) => {
        let result = [];
        let len = promises.length;
        promise.forEach(item => {
            Promise.resolve(item).then(res => {
                result.push(res);
                if (result.length === len) {
                    resolve(result);
                }
            }).catch(err => {
                reject(err);
            })
        })
    })
}

const myRace = function(promises) {
    return new Promise((resolve, reject) => {
        promises.forEach((item => {
            Promise.resolve(item).then(res => {
                resolve(res);
            }).catch(err => {
                reject(err);
            })
        }))
    })
}

const myInstanceof = function(left, right) {
    let leftPro = left.__proto__;
    let rightPro = right.prototype;
    while(true) {
        if (!leftPro) {
            return false;
        }
        if (leftPro === rightPro) {
            return true;
        }
        leftPro = leftPro.__proto__;
    }
}

const sum = function() {
    let args = [...arguments];
    let result = function() {
        args.push(...arguments);
        return result;
    }
    result.sunOf = function() {
        return args.reduce((prev, cur) => prev + cur, 0);
    }
    return result;
}

Array.prototype.myMap = function(fn) {
    let arr = this;
    return arr.reduce((prev, cur, i) => {
        return prev.concat(fn.call(arr, cur, i, arr))
    }, [])
}

const repeat = function (fn, times, wait) {
    return function() {
        let count = 0;
        let timer = setInterval(() => {
            count++;
            if(count === times) {
                clearInterval(timer);
            }
        }, wait)
    }
}

function Person(name, age) {
    this.name = name;
    this.age = age;
}

Person.prototype.sayHi = function() {
    console.log(this.name);
}

function Student(name, age, weight) {
    Person.call(this, name, age);
    this.weight = weight;
}

Student.prototype = new Person();
Student.prototype.constructor = Student;

const myCloneDeep = function(source) {
    let result;
    if(typeof source === 'object') {
        result = Array.isArray(source) ? [] : {};
        for(let key in source) {
            if(typeof source[key] === 'object') {
                result[key] = myCloneDeep(source[key])
            } else {
                result[key] = source[key]
            }
        }
    } else {
        result = source
    }
    return result;
}

let script = document.createElement('script');
script.type = 'text/javascript';
script.src = '111';
document.head.appendChild(script);

function fn(){
    console.log(111)
}

const fn = function(str) {
    let result = '';
    while(str.length > 3) {
        result = ',' + str.slice(-3) + result;
        str = str.slice(0, -3);
    }
    if (str) {
        result = str + result;
    }
    return result;
}

const myIndexOf = function(source, target) {
    let targetLen = target.length;
    let sourceLen = source.length;
    for(let i =0;i<=sourceLen - targetLen;i++) {
        const cur = source.slice(i, i+ targetLen);
        if (cur === target) {
            return i;
        }
    }
    return -1;
}

const fn = function(root) {
    let result = [];
    let queue = [];
    let head;
    if(!root) {
        return;
    }
    queue.push(root);
    while(queue.length) {
        head = queue.shift();
        result.push(head.val);
        if(head.left) queue.push(head.left);
        if(head.right) queue.push(head.right);
    }
    return result;
}

class Subscriber {
    constructor() {
        this.observers = [];
    }
    add(observer) {
        this.obserbers.push(observer)
    }
    notify() {
        this.observers.forEach(item => {
            item.sayHi();
        })
    }
    remove(observer) {
        this.observers = this.observers.filter(item !== observer);
    }
}

class Observer {
    constructor(name) {
        this.name = name;
    }
    sayHi() {
        console.log(`我是${this.name}`)
    }
}

class Bus {
    constructor() {
        this.callbacks = {};
    }
    $on(name, fn) {
        this.callbacks[name] = this.callbacks[name] || [];
        this.callbacks[name].push(fn);
    }
    $emit(name) {
        let args = [...arguments].slice(1);
        if(this.callbacks[name]) {
            this.callbacks[name].forEach(cb => cb(args));
        }
    }
    $off(name) {
        if (this.callbacks[name]) {
            delete this.callbacks[name];
        }
    }
}

const fn = function(arr) {
    let x = arr.length;
    let y = arr[0].length;
    for(let i = 0;i<x;i++) {
        for(let j = 1;j<y;j++) {
            [arr[i][j], arr[j][i]] = [arr[j][i], arr[i][j]]
        }
    }
    for(let i = 0;i<x;i++) {
        for(let j=0lj<y/2;j++) {
            [arr[i][j],arr[i][y-j-1]] = [arr[i][y-j-1], arr[i][j]]
        }
    }
}

const fn = function (arr) {
    let result = [];
    let arrLen = arr.length;
    let leftMax = arr[0];
    let rightMin = arr[arrLen - 1];
    let rightArr = new Array(arrLen);
    for(let i = arrLen - 1;i>=0;i--) {
        if(arr[i] < rightMin) {
            rightMin = arr[i];
        }
        rightArr[i] = rightMin;
    }
    for(let i = 1;i< arrLen -1;i++) {
        if (arr[i] > leftMax) {
            leftMax = arr[i];
            if (arr[i] < rightArr[i+1]){
                result.push(arr[i])
            }
        }
    }
    return result;
}

const fn = function(num, source) {
    if(num % source ===0) {
        return true;
    }
    let numStr = num + '';
    if (numStr.indexOf(source) > -1) {
        return true;
    }
    return false;
}

const fn = function(n,m) {
    return Math.floor(Math.random() * (m-n +1)) + n;
}

const fn = function(nums source) {
    if (num % source ===0) {
        return true;
    }
    num += '';
    if (num.indexOf(source) > -1) {
        return true;
    }
    return false;
}

const fn = function(num) {
    let result = 0;
    while(num !==0) {
        num&=num -1;
        result ++;
    }
    return result;
}

function fn(array, id, pid) {
    let map = {};
    let result = {};
    for(let i =0;arr.length;i++) {
        map[array[i].id] = array[i];
    }

    array.forEach(item => {
        const parent = map[item.pid];
        if(parent) {
            if(!parent.children) {
                parent.children = [];
            }
            parent.children.push(item)
        } else {
            result = item
        }
    })
    return result;
}

function _new (fn) {
    let obj = {
        __proto__: fn.prototype
    }
    let args = [...arguments].slice(1);
    let result = fn.apply(obj, args);
    return result instanceof Object ? result : obj;
}


function myCall (context) {
    context = context || window;
    const fn = Symbol(context);
    const args = [...arguments].slice(1);
    context[fn] = this;
    const result = context[fn](..args);
    delete context[fn];
    return result;
}

function myBind(context) {
    const self = this;
    const args = [...arguments].slice(1);
    function fn() {
        const brgs = [...arguments];
        self.apply(this instanceof self ? this : context, args.concat(brgs))
    }
    function bfn () {}
    bfn.prototype = self.prototype;
    fn.prototype = new bfn();
    return fn;
}

function createIterator(arr) {
    let i = 0;
    return {
        next: function() {
            const done = i > arr.length - 1;
            const value = done ? undefined : arr[i++];
            return {
                done,
                value
            }
        }
    }
}

const iterator = createIterator([1,2,3]);
iterator.next();
iterator.next();
iterator.next();

const arr = [1,2,3,4];
const iterator = arr[Symbol.iterator]();
for (let value, done, res; (res = iterator.next()) && !res.done;) {
    value = res.value;
    done = res.done;
    console.log(value, done)
}

function fn(arr) {
    return arr.reduce((prev, cur) => {
        return prev.concat(Array.isArray(cur) ? fn(cur) : cur);
    }, [])
}

function fn(arr) {
    const result = [];
    const cur = [];
    const len = arr.length;
    function fn() {
        if (cur.length === len) {
            result.push(cur.slice());
            return;
        }
        for (let i = 0;i<len;i++) {
            if (cur.indexOf(arr[i]) > -1) {
                continue;
            }
            cur.push(arr[i]);
            fn();
            cur.pop();
        }
    }
    fn();

    return result;
}

function iterator (arr) {
    let i = 0;
    return {
        next: function () {
            const done = i >= arr.length ? true : false;
            const value = done ? undefined : arr[i];
            return {
                done,
                value
            }
        }
    }
}

for of ;

const gen = iterator(arr);
for (let done, value, res; (res = gen.next()) && !res.done;) {
    done = res.done;
    value = res.value;
    console.log(value, done);
}

function myBind(context) {
    let self = this;
    const args = [...arguments].slice(1);
    function fn() {
        const brgs = [...arguments];
        return self.apply(this instanceof self ? this : context, brgs.cancat(args));
    }
    function bfn() {};
    bfn.prototype = self.prototype;
    fn.prototype = new bfn();

    return fn;
}

function myApply(context) {
    context = context || window;
    const fn = Symbol('fn');
    const args = [...arguments].slice(1);
    context[fn] = this;
    const result = context[fn](...args);
    delete context[fn];
    return result;
}

function fn(a,b) {
    console.log(a,b);
}
fn.apply(null, [1,2])

  const array = [{
     "id": 0,
     "name": "根节点"
   },
   {
     "id": 2,
     "name": "第一级1",
     "pid": 0
   },
   {
     "id": 3,
     "name": "第二级1",
     "pid": 2
   },
   {
     "id": 1,
     "name": "第一级1",
     "pid": 0
   },
   {
     "id": 6,
     "name": "第三级2",
     "pid": 3
   },
 ];

 function fn(arr) {
    let result = {};
    let map = new Map();

    for (let cur of arr) {
        map.set(cur.id, cur)
    }
    const len = arr.length;
    for(let i = 0;i<len;i++) {
        if (map.has(arr[i].pid)) {
            const parent = map.get(arr[i].pid);
            if (!parent.children) {
                parent.children =  [];
            }
            parent.children.push(arr[i]);
        } else {
            result = arr[i];
        }
    }
    return result;
 }

 console.log(fn(array));

```






