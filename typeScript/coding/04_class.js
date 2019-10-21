//基本使用
// class Cat {
//     catName: string
//     constructor(catName: string) {
//         this.catName = catName
//     }
//     say() {
//         console.log(`我是${this.catName}`)
//     }
// }
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
// let cat = new Cat('蓝猫')
//继承
// class Animal {
//     animalName: string
//     constructor(animalName: string) {
//         this.animalName = animalName
//     }
//     sayName() {
//         console.log(`我是${this.animalName}`)
//     }
// }
// class Cat extends Animal {
//     Catbreed: string
//     constructor(animalName: string, Catbreed: string) {
//         super(animalName);
//         this.Catbreed = Catbreed
//     }
//     sayBreed() {
//         console.log(`我是${this.Catbreed}`)
//     }
// }
// let cat1 = new Cat('小黑', '黑猫')
// cat1.sayName()
// cat1.sayBreed()
//复杂继承
// class Animal {
//     name: string
//     constructor(name: string) {
//         this.name = name
//     }
//     move(distance: number = 0) {
//         console.log(`${this.name}走动了${distance}米`)
//     }
// }
// class Snake extends Animal {
//     constructor(name: string) {
//         super(name)
//     }
//     move(distance: number = 10) {
//         console.log(`${this.name}走动了${distance}厘米`);
//         // super.move(distance)
//     }
// }
// class Horse extends Animal {
//     constructor(name: string) {
//         super(name)
//     }
//     move(distance: number = 5) {
//         console.log(`${this.name}走动了${distance}千米`);
//         super.move(distance)
//     }
// }
// let snake1 = new Snake('小蛇');
// snake1.move(123);
// let horse1 = new Horse('小马');
// horse1.move(12);
//公共(默认)、私有、受保护<修饰符>
//公共
// class Animal {
//     public name: string
//     public constructor(name: string) {
//         this.name = name
//     }
//     public move(distance) {
//         console.log(`${this.name}走了${distance}`)
//     }
// }
// class Animal {
//     private name: string
//     public constructor(name: string) {
//         this.name = name
//     }
//     public move(distance) {
//         console.log(`${this.name}走了${distance}`)
//     }
// }
// class Cat extends Animal {
//     constructor(name: string) {
//         super(name)
//     }
// }
// let cat1 = new Cat('a');
// console.log(cat1)
// console.log(cat1.name);//报错，私有 外界不能调用
//私有
// class Animal {
//     private name: string
//     constructor(name: string) {
//         this.name = name
//     }
// }
// class Cat extends Animal {
//     constructor(name: string) {
//         super(name)
//     }
//     say(){
//         console.log(this.name);//报错，不能在子类加载
//     }
// }
// class Dog {
//     private name: string
//     constructor(name: string) {
//         this.name = name
//     }
// }
// let animal1 = new Animal('猪');
// let cat1 = new Cat('猫')
// let dog1 = new Dog('狗')
// cat1.name;//属性“name”为私有属性，只能在类“Animal”中访问
// console.log(cat1, dog1)
// animal1 = cat1;
// animal1 = dog1;//报错，Animal和Dog有私有类
//受保护
// class Person {
//     protected name: string
//     constructor(name: string) {
//         this.name = name
//     }
// }
// class Employee extends Person {
//     private compony: string
//     constructor(name: string, compony: string) {
//         super(name);
//         this.compony = compony
//     }
//     logMsg() {
//         return `我叫${this.name},我在${this.compony}`
//     }
// }
// let p = new Employee('科比', 'NBA');
// p.name;//报错，name为受保护类型，只能在Person中访问,其子类中访问
// console.log(p.logMsg())
//静态属性--只有自己才能访问
// class Company {
//     static title = '11'
//     college: String
//     constructor(college: string) {
//         this.college = college
//     }
//     say() {
//         console.log(`${Company.title}-----${this.college}`)
//     }
// }
// let compony = new Company('aa');
// compony.say()
//抽象类
var Department = /** @class */ (function () {
    function Department(name) {
        this.name = name;
    }
    Department.prototype.printName = function () {
        console.log('部门名称:' + this.name);
    };
    return Department;
}());
var Accounting = /** @class */ (function (_super) {
    __extends(Accounting, _super);
    function Accounting(name) {
        return _super.call(this, name) || this;
    }
    Accounting.prototype.printMeeting = function () {
        console.log(1111);
    };
    Accounting.prototype.printPay = function () {
        console.log(1321111);
    };
    return Accounting;
}(Department));
var department = new Accounting('研发部');
department.printMeeting();
department.printPay();
