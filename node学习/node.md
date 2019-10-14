# node学习
## 简介
>- 事件驱动、非阻塞、性能高、单线程、异步、IO。生态圈很好，有很多npm包。 

### 事件
```javascript
    var events = require('events');//引入事件库
    var util = require('util');//工具库
    var Person = function(name){
        this.name = name
    }
    util.inherits(Person,events.EventEmitter);//继承，让Person继承events.EventEmiiter类
    var xiaohu = new Person('xiaohu');
    var lili = new Person('lili');
    var luck = new Person('luck');
    var persons = [xiaohu,lili,luck];
    persons.forEach(function(person){
        person.on('speak',function(message){//events.EventEmitter的方法
            console.log(person.name + 'say:' + message);
        })
    })
    xiaohu.emit('speak','xiaohu');//第二个参数为message
    lili.emit('speak','lili')
    luck.emit('speak','luck')

    var myEmitter = new events.EventEmitter();//事件对象
    myEmitter.on('someEvent',function(message){//绑定事件
        console.log(message)
    })
    myEmitter.emit('someEvent','the event was emitted');//触发事件
```

### 读写文件
```javascript
    var fs= require('fs');//文件系统fileSystem
    //读文件
    var read = fs.readFileSync('readMe.txt','utf-8');//同步Sync 
    console.log(read);//打印文件内容---hello world
    var readMe = fs.readFile('readMe.txt','utf8',function(err,data){//异步读
        fs.writeFile('writeMe.txt','data',function(){//异步写
            console.log('writeMe has finished');
        })        
    });//异步  


    //写文件
    fs.writeFileSync('writeMe.txt',read);//将read文件的内容写入writeMe.txt（原有的会被情况）文件中
    fs.writeFileSync('writeMe.txt','hello');//将hello字符串写入writeMe.txt（原有的会被情况）文件中
```

### 创建/删除读写文件
```javascript
    //删除文件
    var fs = require('fs');
    fs.unlink('writeMe.txt',function(){//异步
        console.log('delete ok')
    })
    fs.unlinkSync('writeMe.txt',function(){//同步
        console.log('delete ok')
    })

    //创建文件
    var fs = require('fs');
    //创建一个stuff文件夹，读取readMe.txt的内容，将内容写到'./stuff/readMe.txt'
    fs.mkdir('stuff', function () {
        fs.readFile('readMe.txt', function (err,data) {
            fs.writeFile('./stuff/readMe.txt',data,function(){//data为readMe.txt的内容
                console.log('write ok')
            })
        })
    })

```

### 流stream读写文件
```javascript
var fs = require('fs')
// var myReadStream = fs.createReadStream(__dirname + '/readMe.txt');//buffer格式
var myReadStream = fs.createReadStream(__dirname + '/readMe.txt','utf8');//utf-8格式
var myWriteStream = fs.createWriteStream(__dirname + '/writeMe.txt');

var data = ''
myReadStream.on('data', function (chunk) {//文件会被分为一个个buffer存储（文件内容多的时候）
    data+=chunk;
    myWriteStream.write(data)
})

myReadStream.on('end',function(){
    console.log(data);//hello world
})
```

### 管道
```javascript
    var fs = require('fs');
    var myReadStream = fs.createReadStream(__dirname + '/readMe.txt');
    var myWriteStream = fs.createWriteStream(__dirname + '/writeMe.txt');
    myReadStream.pipe(myWriteStream)

```

### http
```javascript
    //返回json文件
    var http = require('http');
    var server = http.createServer(function(request,response){
        console.log('Request receoved');
        response.writeHead(200,{'Content-Type':'text/json '});
        // response.write('hello');
        var myObj = {
            name: 'xiaohu',
            age:'18'
        };

        response.end(JSON.stringify(myObj));//返回json字符串
    })
    server.listen(3000,'127.0.0.1');//监听3000端口

    //返回html文件，并在页面显示
    var http = require('http');
    var fs = require('fs');
    var server = http.createServer(function (request, response) {
        console.log('Request receoved');
        response.writeHead(200, { 'Content-Type': 'text/html' });//告诉浏览器以html文件去解析
        var myReadStream = fs.createReadStream(__dirname + '/a.html', 'utf8');
        myReadStream.pipe(response)
    })
    server.listen(3000, '127.0.0.1');//监听3000端口 
```

### 路由






























