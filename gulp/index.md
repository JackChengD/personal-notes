# gulp学习

用自动化构建工具增强你的工作流程！  
是一个基于流的自动化构建工具，不包括模块化的功能，通过配置一系列的task，例如文件压缩合并、雪碧图、启动server、版本控制等，然后定义执行顺序来让gulp执行task，从而构建前端项目的流程。  

## 特点

易于使用：通过代码优于配置策略，gulp让简单的任务、复杂的任务可管理。  
构建快速：使用node.js流的威力，你可以快速构建项目并减少频繁的io操作。  
插件高质：gulp严格的插件指南确保插件如你所期望的那样简洁高质的工作。  
易于学习：通过最少的API，掌握gulp毫不费力，构建工作尽在掌握：如同一系列流管道。  

## 入门指南

1.全局安装gulp  

```shell
    npm install -g gulp
```

2.作为项目的开发依赖（devDependencies）安装  

```shell
    npm install gulp -D
```

3.在项目根目录下创建gulpfile.js的文件  

```js
    var gulp = require('gulp');
    gulp.task('default', function() {
        // 将你的默认任务代码在这
    });
```

4.运行gulp  

```shell
    gulp
```

默认的名为default的任务（task）将会被运行，在这里，这个任务并未做任何事情。  
想要单独执行特定的任务（task），请输入 gulp `<task>` `<othertask>`。  

## api文档

task, series, parallel, src, pipe, dest, on, watch  

> task: 创建一个任务
> series：顺序执行多个任务
> prallel：并行执行多个任务
> src：读取数据源转换成stream
> pipe：管道-可以在中间对数据流进行处理
> dest：输出数据流到目标路径
> on：事件监听
> watch：数据源监听

### src(globs, [options])

创建一个流，用于从文件系统读取 Vinyl 对象。  
注：BOMs(字节顺序标记)在 UTF-8 中没有任何作用，除非使用 removeBOM 选项禁用，否则 src() 将从读取的 UTF-8 文件中删除BOMs。  

```js
    const { src, dest } = require('gulp');

    function copy() {
    return src('input/*.js')
        .pipe(dest('output/'));
    }

    exports.copy = copy;
```

### dest(directory, [options])

创建一个用于将 Vinyl 对象写入到文件系统的流。

```js
    const { src, dest } = require('gulp');

    function copy() {
    return src('input/*.js')
        .pipe(dest('output/'));
    }

    exports.copy = copy;
```

### symlink(directory, [options])

创建一个流（stream），用于连接 [Vinyl](https://www.gulpjs.com.cn/docs/api/concepts/#vinyl) 对象到文件系统。

```js
    const { src, symlink } = require('gulp');

    function link() {
    return src('input/*.js')
        .pipe(symlink('output/'));
    }

    exports.link = link;
```

### lastRun(task, [precision])

检索在当前运行进程中成功完成任务的最后一次时间。最有用的后续任务运行时，监视程序正在运行。当监视程序正在运行时，对于后续的任务运行最有用。  

当与`src()`组合时，通过跳过自上次成功完成任务以来没有更 改的文件，使增量构建能够加快执行时间。

```js
    const { src, dest, lastRun, watch } = require('gulp');
    const imagemin = require('gulp-imagemin');

    function images() {
    return src('src/images/**/*.jpg', { since: lastRun(images) })
        .pipe(imagemin())
        .pipe(dest('build/img/'));
    }

    exports.default = function() {
    watch('src/images/**/*.jpg', images);
    };
```

### series(...tasks)

将任务函数和/或组合操作组合成更大的操作，这些操作将按顺序依次执行。对于使用 series() 和 parallel() 组合操作的嵌套深度没有强制限制。  

```js
    const { series } = require('gulp');

    function javascript(cb) {
    // body omitted
    cb();
    }

    function css(cb) {
    // body omitted
    cb();
    }

    exports.build = series(javascript, css);
```

### parallel(...tasks)

将任务功能和/或组合操作组合成同时执行的较大操作。对于使用 series() 和 parallel() 进行嵌套组合的深度没有强制限制。  

```js
    const { parallel } = require('gulp');

    function javascript(cb) {
    // body omitted
        cb();
    }

    function css(cb) {
    // body omitted
        cb();
    }

    exports.build = parallel(javascript, css);
```

### watch(globs, [options], [task])

监听 globs 并在发生更改时运行任务。任务与任务系统的其余部分被统一处理。  

```js
    const { watch } = require('gulp');

    watch(['input/*.js', '!input/something.js'], function(cb) {
        // body omitted
        cb();
    });
```

### task()

提醒: 这个API不再是推荐的模式了 - [export your tasks](https://www.gulpjs.com.cn/docs/getting-started/creating-tasks/)。因此就不翻译了！  

在任务系统中定义任务。然后可以从命令行和 `series()`、`parallel()` 和` lastRun()` api 访问该任务。

```js
    const { task } = require('gulp');

    function build(cb) {
        // body omitted
        cb();
    }

    task(build)
```

### registry([registryInstance])

允许将自定义的注册表插入到任务系统中，以期提供共享任务或增强功能。  

**注意**： 只有用 task() 方法注册的任务才会进入自定义注册表中。直接传递给 series() 或 parallel() 的任务函数（task functions）不会进入自定义任务注册表 - 如果你需要自定义注册表的行为，请通过字符串引用的方式将任务（task）组合在一起。  

分配新注册表时，将传输当前注册表中的每个任务，并将用新注册表替换当前注册表。这允许按顺序添加多个自定义注册表。  

有关详细信息，请参考 [创建自定义注册表](https://www.gulpjs.com.cn/docs/documentation-missing/) 。  

```js
    const { registry, task, series } = require('gulp');
    const FwdRef = require('undertaker-forward-reference');

    registry(FwdRef());

    task('default', series('forward-ref'));

    task('forward-ref', function(cb) {
        // body omitted
        cb();
    });
```

## gulp插件

gulp 开发社区正在快速成长，每天都会有新的插件诞生。在[主站](https://gulpjs.com/plugins/)上可以查看完整的列表。  
