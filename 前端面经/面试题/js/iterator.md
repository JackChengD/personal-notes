# iterator

简单实现

```js
function createIterator (items) {
    var i = 0;
    return {
        next: function() {
            var done = i >= items.length;
            var value = done ? undefined : items[i++];
            return {
                done,
                value,
            }
            
        }
    }
}

const arr = [1,2,3];
const iterator = createIterator(arr);
iterator.next(); // { done: false, value: 1}
iterator.next(); // { done: false, value: 2}
iterator.next(); // { done: false, value: 3}
iterator.next(); // { done: true, value: undefined}

```

for..of内部实现可以简单了解为

```js
const arr = [1,2,3,4,5];
const iterator = arr[Symbol.iterator]();

for(let value, res; (res = iterator.next()) && !res.done;) {
    value = res.value;
    console.log(value)
}
```
