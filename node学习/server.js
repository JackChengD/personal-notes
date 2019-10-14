// 事件
// var events = require('events');//引入事件
// var myEmitter = new events.EventEmitter();//事件对象
// myEmitter.on('someEvent', function (message) {//绑定事件
//     console.log(message)
// })
// myEmitter.emit('someEvent', 'the event was emitted');


// 继承
// var events = require('events');//引入事件库
// var util = require('util');//工具库
// var Person = function(name){
//     this.name = name
// }
// util.inherits(Person,events.EventEmitter);
// var xiaohu = new Person('xiaohu');
// var lili = new Person('lili');
// var luck = new Person('luck');
// var persons = [xiaohu,lili,luck];
// persons.forEach(function(person){
//     person.on('speak',function(message){
//         console.log(person.name + 'say:' + message);
//     })
// })
// xiaohu.emit('speak','hiiii')
// lili.emit('speak','hiiiii')
// luck.emit('speak','hiiiiii')

//读取文件
// var fs= require('fs');
// var read = fs.readFileSync('readMe.txt','utf-8')
// console.log(read)
// fs.writeFileSync('writeMe.txt',read);

//删除文件
// var fs = require('fs');
// fs.unlink('writeMe.txt',function(){//异步
//     console.log('delete ok')
// })
// fs.unlinkSync('writeMe.txt',function(){//同步
//     console.log('delete ok')
// })

//创建文件
// var fs = require('fs');
// fs.mkdir('stuff', function () {
//     fs.readFile('readMe.txt', function (err,data) {
//         fs.writeFile('./stuff/readMe.txt',data,function(){
//             console.log('write ok') 
//         })
//     })
// })

//流stream
// var fs = require('fs')
// // var myReadStream = fs.createReadStream(__dirname + '/readMe.txt');//buffer格式
// var myReadStream = fs.createReadStream(__dirname + '/readMe.txt','utf8');//utf-8格式
// var myWriteStream = fs.createWriteStream(__dirname + '/writeMe.txt','utf8');

// var data = ''
// myReadStream.on('data', function (chunk) {//文件会被分为一个个buffer存储（文件内容多的时候）
//     data+=chunk;
//     myWriteStream.write(data)
// })

// myReadStream.on('end',function(){
//     // console.log(data);//hello world
// })

//管道pipe
// var fs = require('fs');
// var myReadStream = fs.createReadStream(__dirname + '/readMe.txt');
// var myWriteStream = fs.createWriteStream(__dirname + '/writeMe.txt');
// myReadStream.pipe(myWriteStream)

//http模块
// var http = require('http');
// var fs = require('fs');

// function startServer() {
//     var server = http.createServer(function (request, response) {
//         console.log('Request receoved');
//         response.writeHead(200, { 'Content-Type': 'text/html' });
//         var myRead = fs.createReadStream(__dirname + '/a.html', 'utf8');
//         myRead.pipe(response)
//     })
//     server.listen(3000, '127.0.0.1');//监听3000端口 
// }

// exports.startServer = startServer;

//路由
var http = require('http');
var fs = require('fs');

function startServer() {
    var server = http.createServer(function (request, response) {
        console.log('Request receoved' + request.url);
        if (request.url === '/' || request.url === '/a') {
            response.writeHead(200, { 'Content-Type': 'text/html' });
            fs.createReadStream(__dirname + '/a.html', 'utf8').pipe(response)
        } else {
            response.writeHead(200, { 'Content-Type': 'text/json' });
            var obj = {
                name: 'xiaohu',
                age: 18
            }
            response.end(JSON.stringify(obj))
        }

    })
    server.listen(3000, '127.0.0.1');//监听3000端口 
}

exports.startServer = startServer;








