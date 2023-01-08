# practice

```js

/**
    冒泡
**/
function fn (arr) {
    const len = arr.length;
    for (let i =0;i<len;i++) {
        for (let j = i+1;j<len;j++) {
            if (arr[i] > arr[j]) {
                [arr[i], arr[j]] = [arr[j], arr[i]];
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
    const len = arr.length;
    for (let i = 1;i<len;i++) {
        for (let j=i;j>0;j--) {
            if (arr[j-1] > arr[j]) {
                [arr[j-1], arr[j]] = [arr[j], arr[j-1]];
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
    const len = arr.length;
    for (let i =0; i< len;i++) {
        let min = i;
        for (let j = i+1;i<len;j++) {
            if (arr[min] > arr[j]) {
                min = j;
            }
        }
        if (min !== i) {
            [arr[i], arr[min]] = [arr[min], arr[i]];
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
    const len = arr.length;
    if (len < 2) {
        return arr;
    }
    let left = 0;
    let right = len - 1;
    let point = arr[0];
    while(left < right) {
        while(left < right && arr[left] <= point) {
            left++;
        }
        while(left < right && arr[right] >= point) {
            right--;
        }
        [arr[left], arr[right]] = [arr[right], arr[left]];
    }
    if (point > arr[left]) {
        [arr[0], arr[left]] = [arr[left], arr[0]];
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
    var args = [...arguments].slice(1);
    var result = context[fn](...args);
    delete context[fn];
    return result;
}

const myCall = function(context) {
    context= context || window;
    let fn = Symbol(context);
    context[fn] = this;
    let args = [...arguments[1]];
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
    const row = arr.length;
    const col = arr[0].length;
    
    for (let i = 0;i< Math.floor(row/ 2);i++) {
        for (let j = 0; j< col ;j++) {
            [arr[i][j], arr[row - i -1][j]] = [arr[row - i - 1][j], arr[i][j]]
        }
    }

    for (let i = 0;i<row;i++) {
        for (let j = 0;j<i;j++) {
            [arr[i][j], arr[j][i]] = [arr[j][i], arr[i][j]]
        }
    }
    return arr;
}

console.log(fn([[1, 2, 3, 4],[5, 6, 7, 8], [9, 10, 11, 12], [13, 14, 15, 16]]))

/**
  乱序数组中找比左边都小比右边都大的数
  两次遍历，记录左边最大值，右边用新数组记录每个点（从右往左）的最小值
  从右往左找，找到每个位置的最小值并记录起来
  从左往右找，当前值大于左边最大值，更新左边最大值，再看当前值是否小于（右边过来的数组）索引下一个小
  如果是，那么当前是就是比左边都大比右边都小的数
**/
function fn(arr) {
    const result = [];
    const len = arr.length;
    const leftMax = new Array(len);
    const rightMin = new Array(len);
    let curLeftMax = arr[0];
    let curRightMin = arr[len - 1];
    for (let i = len - 1; i >= 0; i--) {
        if (arr[i] < curRightMin) {
            curRightMin = arr[i];
        }
        rightMin[i] = curRightMin;
    }

    // 第一个和最后一个不用看
    for (let i = 1; i < len -1 ;i++) {
        if (arr[i] > curLeftMax) {
            if (arr[i] < rightMin[i+1]) {
                result.push(arr[i]);
            }
            curLeftMax = arr[i];
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
    if (num % source === 0) {
        return true;
    }
    const numStr = num + '';
    if (numStr.indexOf(source) > -1) {
        return true;
    }
    return false;
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
    const map = new Map();
    let result = {};
    const len = arr.length;
    for (let i = 0; i<len;i++) {
        map.set(arr[i].id, arr[i])
    }
    for (let i = 0; i<len;i++) {
        const parent = map.get(arr[i].pid);
        if (parent) {
            if (!parent.children) {
                parent.children = []
            }
            parent.children.push(arr[i])
        } else {
            result = arr[i];
        }
    }

    return result;
}

console.log(fn(array))

```

```js
function fn (arr) {
    const len = arr.length;
    for (let i =0;i<len;i++) {
        for (let j = i+1;j<len;j++) {
            if (arr[i] > arr[j]) {
                [arr[i], arr[j]] = [arr[j], arr[i]];
            }
        }
    }
    return arr;
}

function fn (arr) {
    const len = arr.length;
    for (let i = 1;i<len;i++) {
        for (let j=i;j>0;j--) {
            if (arr[j-1] > arr[j]) {
                [arr[j-1], arr[j]] = [arr[j], arr[j-1]];
            }
        }
    }
    return arr;
}

function fn (arr) {
    const len = arr.length;
    for (let i =0; i< len;i++) {
        let min = i;
        for (let j = i+1;i<len;j++) {
            if (arr[min] > arr[j]) {
                min = j;
            }
        }
        if (min !== i) {
            [arr[i], arr[min]] = [arr[min], arr[i]];
        }
    }
    return arr;
}


function fn (arr) {
    const len = arr.length;
    if (len < 2) {
        return arr;
    }
    let left = 0;
    let right = len - 1;
    let point = arr[0];
    while(left < right) {
        while(left < right && arr[left] <= point) {
            left++;
        }
        while(left < right && arr[right] >= point) {
            right--;
        }
        [arr[left], arr[right]] = [arr[right], arr[left]];
    }
    if (point > arr[left]) {
        [arr[0], arr[left]] = [arr[left], arr[0]];
    }
    return fn(arr.slice(0, left)).concat(fn(arr.slice(left)));
}

function fn(root) {
    if (!root) {
        return [];
    }
    const result = [];
    const queue = [root];
    while(queue.length) {
        const cur = queue.shift();
        result.push(cur.val);
        if (cur.left) {
            queue.push(cur.left);
        }
        if (cur.right) {
            queue.push(cur.right);
        }
    }
    return result;
}

const xhr = window.XMLHttpRequest ? new XMLHtppRequest () : new ActiveXObject('Microsoft.XMLHTTP');
xhr.open('url', get, true);
xhr.send();
xhr.onreadystatechange = function () {
    if (xhr.state === 200 && xhr.readyState === 4) {
        console.log(xhr.responseText);
    }
}

const debounce = function (fn, delay = 1000) {
    let timer = null;
    return function () {
        if (timer) {
            clearTimeout(timer);
        }
        const args = [...arguments];
        const self = this;
        timer = setTimeout(() => {
            fn.apply(self, args);
        }, delay);
    }
}

const throttle = function (fn, delay = 1000) {
    let flag = true;
    return function () {
        if (!flag) {
            return;
        }
        flag = false;
        const args = [...arguments];
        const self = this;
        setTimeout(() => {
            fn.apply(self, args);
            flag = true;
        }, true)
    }
}

const myNew = function(fn) {
    const obj = {
        __proto__: fn.protyoe
    }
    const args = [...arguments].slice(1);
    const result = fn.apply(obj, args);
    return result instanceof Object ? result : obj;
}

const myFlat = function(arr) {
    return arr.reduce((prev, cur) => {
        return prev.concat(Array.isArray(cur) ? myFlat(cur) : cur);
    }, [])
}

const myApply = function (context) {
    context = context || window;
    const fn = Symbol(context);
    context[fn] = this;
    const args = [...arguments[1]];
    const result = context[fn](...args);
    delete context[fn];
    return result;
}

const myCall = function (context) {
    context = context || window;
    const fn = Symbol(context);
    context[fn] = this;
    const args = [...arguments].slice(1);
    const result = context[fn](...args);
    delete context[fn];
    return result;
}

const myBind = function (context) {
    const self = this;
    const args= [...arguments].slice(1);
    function fn() {
        const brgs = [...arguments];
        return self.apply(this instanceof self ? this : context, args.concat(brgs));
    }
    function bfn() {};
    bfn.prototype = self.prototype;
    fn.prototype = new bfn();
    return fn;
}

function fn (head) {
    if (!head || !head.next) {
        return false;
    }
    let slot = head;
    let fast = head.next;
    while(fast && fast.next) {
        if (slot === fast) {
            return true;
        }
        slot = slot.next;
        fast = fast.next.next;
    }
    return false;
}

function sleep (delay) {
    return new Promise(resolve => {
        setTimeout(resolve, delay)
    })
}

const myTrim = function (str) {
    return str.replace(/(^\s*) | (\s*$)/g, '');
}

const fixAddNumber = function(a,b) {
    return parseFloat((a+b).toFixed(10));
}

const myAll = function(promises) {
    return new Promise((resolve, reject) => {
        const len = promises.length;
        const result = [];
        for(let i =0;i<len;i++) {
            Promise.resolve(promises[i]).then(res => {
                result.push(res);
                if (result.length === len) {
                    resolve(result);
                }
            }).catch(err => {
                reject(err);
            })
        }
    });
}

const myRace = function(promises) {
    return new Promise((resolve, reject) => {
        const len = promises.length;
        for (let i = 0; i< len;i++) {
            Promise.resolve(promises[i]).then(res => {
                resolve(res);
            }).catch(err => {
                reject(err);
            })
        }
    });
}

const myInstanceof (left, right) {
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

const sum = function () {
    const args = [...arguments];
    const result = function () {
        const brgs = [...arguments];
        args.push(...brgs);
        return result;
    }
    result.sumOf = function () {
        args.reduce((prev, cur) => {
            return prev + cur;
        }, 0)
    }
    return result;
}

Array.prototype.myMap = (fn) {
    const arr = this;
    return arr.reduce((prev, cur, i) => {
        return prev.concat(fn.call(arr, cur, i, arr);)
    }, [])
}

function Person(name, age) {
    this.name = name;
    this.age = age;
}

Person.prototypr.sayHi = function() {
    console.log('sayHi');
}

function Student (name, age, height) {
    Person.call(this, nam, age);
    this.height = height;
}

Student.prototype = new Person()
Student.protptype.constructor = Student;

function myClone (sourse) {
    let result;
    if (typeof source === 'object') {
        result = Array.isArray(source) ? [] : {};
        for (let key in source) {
            if (typeof source[key] === 'object') {
                result[key] = myClone(source[key]);
            } else {
                result[key] = source[key];
            }
        }
    } else {
        result = source;
    }
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

const myIndexof = function(source, target) {
    let targetLen = target.length;
    let sourceLen = source.length;
    for (let i =0;i<=sourceLen - targetLen;i++) {
        const cur = source.slice(i, i + targetLen);
        if (cur === target) {
            return i;
        }
    }
    return -1;
}

function fn(root) {
    if (!root) {
        return;
    }
    const result = [];
    const queue = [root];
    while(queue.length) {
        const cur = queue.shift();
        result.push(cur.val);
        if (cur.left) {
            queue.push(cur.left);
        }
        if (cur.right) {
            queue.push(cur.right);
        }
    }

    return result;
}

class Subscribe {
    constructor() {
        this.observers = [];
    }
    depend(fn) {
        this.observers.push(fn)
    }
    notify() {
        this.obersers.forEach((item) => {
            item.update();
        })
    }
    remove(fn) {
        this.obersers = this.observers.filter(item => item !== fn);
    }
}

class Observer {
    constructor(name) {
        this.name = name;
    }
    update() {
        console.log('this.name', this.name);
    }
}

const observer1 = new Observer(1);
const observer2 = new Observer(2);
const observer3 = new Observer(3);
const subscribe = new Subscribe();
subscribe.depend(observer1);
subscribe.depend(observer2);
subscribe.depend(observer3);
subscribe.notify();
subscribe.remove(observer1);
subscribe.notify();

class Bus {
    constructor() {
        this.callbacks = {};
    }
    $on(name, fn) {
        this.callbacks[name] = this.callbacks[name] || [];
        this.callbacks[name].push(fn)
    }
    $emit(name) {
        let args = [...arguments].slice(1)
        this.callbacks[name].forEach(item => {
            item(args);
        })
    }
    $off(name) {
        if (this.callbacks[name]) {
            delete this.callback[name];
        }
    }
}

const fn = function(arr) {
    const row = arr.length;
    const col = arr[0].length;
    
    for (let i = 0;i< Math.floor(row/ 2);i++) {
        for (let j = 0; j< col ;j++) {
            [arr[i][j], arr[row - i -1][j]] = [arr[row - i - 1][j], arr[i][j]]
        }
    }

    for (let i = 0;i<row;i++) {
        for (let j = 0;j<i;j++) {
            [arr[i][j], arr[j][i]] = [arr[j][i], arr[i][j]]
        }
    }
    return arr;
}

function fn(arr) {
    const result = [];
    const len = arr.length;
    const leftMax = new Array(len);
    const rightMin = new Array(len);
    let curLeftMax = arr[0];
    let curRightMin = arr[len - 1];
    for (let i = len - 1; i >= 0; i--) {
        if (arr[i] < curRightMin) {
            curRightMin = arr[i];
        }
        rightMin[i] = curRightMin;
    }

    // 第一个和最后一个不用看
    for (let i = 1; i < len -1 ;i++) {
        if (arr[i] > curLeftMax) {
            if (arr[i] < rightMin[i+1]) {
                result.push(arr[i]);
            }
            curLeftMax = arr[i];
        }
    }
    return result;
}

console.log(fn([1,2,3,7,4,5,6]))

function fn (num, source) {
    if (num % source === 0) {
        return true;
    }
    const numStr = num + '';
    if (numStr.indexOf(source) > -1) {
        return true;
    }
    return false;
}

function fn(n, m) {
    return Math.floor(Math.random() * (m-n +1)) + n;
}

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
    const map = new Map();
    let result = {};
    const len = arr.length;
    for (let i = 0; i<len;i++) {
        map.set(arr[i].id, arr[i])
    }
    for (let i = 0; i<len;i++) {
        const parent = map.get(arr[i].pid);
        if (parent) {
            if (!parent.children) {
                parent.children = []
            }
            parent.children.push(arr[i])
        } else {
            result = arr[i];
        }
    }

    return result;
}

console.log(fn(array))

```