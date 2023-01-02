const { SyncHook } = require("tapable");

const syncHook = new SyncHook(["author", "age"]);

//第二步：注册事件1
syncHook.tap("监听器1", (name, age) => {
  console.log("监听器1:", name, age);
});

//第二步：注册事件2
syncHook.tap("监听器2", (name) => {
  console.log("监听器2", name);
});

//第三步：注册事件3
syncHook.tap("监听器3", (name) => {
  console.log("监听器3", name);
});
//第三步：触发事件，这里传的是实参，会被每一个注册函数接收到
syncHook.call("不要秃头啊", "99");
