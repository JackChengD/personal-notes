// 类型注解
// function log(msg: string) {
//     console.log('111' + msg)
// }
// log('321')
// log(321)
//接口
// interface Person {
//     name: string,
//     age: number,
//     sex: string
// }
// function fn(person: Person) {
//     console.log(`姓名：${person.name}，年龄：${person.age}，性别：${person.sex}`)
// }
// let obj = {
//     name: '小虎',
//     age: 18,
//     sex: '男'
// }
// fn(obj)
//类
var Dog = /** @class */ (function () {
    function Dog(dogName, dogAge, dogSex) {
        this.dogName = dogName;
        this.dogAge = dogAge;
        this.dogSex = dogSex;
    }
    Dog.prototype.eat = function (foods) {
        console.log("\u5403" + foods);
    };
    return Dog;
}());
var dog = new Dog('小狗', 3, '公');
console.log(dog);
dog.eat('狗粮');
