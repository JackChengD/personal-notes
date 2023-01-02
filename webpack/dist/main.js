
    (() => {
      var modules = {
        
          "./src/name.js": (module) => {
            module.exports = "不要秃头啊"; //给你的代码加点注释：loader2//给你的代码加点注释：loader1
          }
          ,
          "./src/age.js": (module) => {
            module.exports = "99"; //给你的代码加点注释：loader2//给你的代码加点注释：loader1
          }
          ,
          "./src/index.js": (module) => {
            const name = require("./src/name.js");
const age = require("./src/age.js");
console.log("entry文件打印作者信息", name, age);
//给你的代码加点注释：loader2//给你的代码加点注释：loader1
          }
          
      };
      var cache = {};
      function reequie(moduleId) {
        var cacheModule = cache[moduleId];
        if (cacheModule !== undefined) {
          return cacheModule.export;
        }
        var module = (cache[moduleId] = {
          exports: {},
        });
        modules[moduleId](module, module.exports, require);
        return module.exports;
      }
      var exports = {};
      const name = require("./src/name.js");
const age = require("./src/age.js");
console.log("entry文件打印作者信息", name, age);
//给你的代码加点注释：loader2//给你的代码加点注释：loader1
    })();
  