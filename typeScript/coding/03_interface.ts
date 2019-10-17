// 接口
// interface Person {
//     pName: string,
//     pAge: number,
//     pJob: string
// }

// let p1: Person = {
//     pName: '张三',
//     pAge: 12,
//     pJob: '12'
// };

// (function fn(p1) {
//     console.log(`${p1.pName}`)
// })(p1)

//接口-可选属性,使用? 
//输出
// interface Circle {
//     color: string,
//     area: number
// }
// //输入
// interface CircleConfig {
//     color?: string,
//     radius: number
// }


// function createCircle(config: CircleConfig): Circle {
//     let newCircle = { color: 'green', area: 100 };
//     if (config.color) {
//         newCircle.color = config.color
//     }
//     if (config.radius) { 
//         newCircle.area = Math.PI * Math.pow(config.radius, 2)
//     }
//     return newCircle
// }
// let obj: CircleConfig = {
//     radius: 4
// }
// console.log(createCircle(obj))

//只读属性，只有第一个才能赋值，其他都不行，只能读  
// interface FullName {
//     readonly firstName: string,
//     readonly lastName: string
// }
// let p1: FullName = {
//     firstName: '111',
//     lastName: '222'
// }
// console.log(p1);
// p1.firstName = '321';//报错
// console.log(p1)

// let arr: number[] = [1, 2, 3, 4];
// arr.push(3);
// console.log(arr);
// let arr1:ReadonlyArray<number> = [1,2,4,5];
// arr1.push(4);//报错
// console.log(arr1)

//额外的属性检查
//1.使用类型断言
// interface Circle {
//     color: string,
//     area: number
// }
// //输入
// interface CircleConfig {
//     color?: string,
//     radius?: number
// }


// function createCircle(config: CircleConfig): Circle {
//     console.log(config)
//     let newCircle = { color: 'green', area: 100 };
//     if (config.color) {
//         newCircle.color = config.color
//     }
//     if (config.radius) {
//         newCircle.area = Math.PI * Math.pow(config.radius, 2)
//     }
//     return newCircle
// }
// let obj = {
//     radiusss: 4
// }
// console.log(createCircle(obj as CircleConfig))

//2.字符串的索引签名
// interface Circle {
//     color: string,
//     area: number
// }
// //输入
// interface CircleConfig {
//     color?: string,
//     radius?: number,
//     //字符串的索引签名
//     [propsName: string]: any
// }
// function createCircle(config: CircleConfig): Circle {
//     console.log(config.radiusss)
//     let newCircle = { color: 'green', area: 100 };
//     if (config.color) {
//         newCircle.color = config.color
//     }
//     if (config.radius) {
//         newCircle.area = Math.PI * Math.pow(config.radius, 2)
//     }
//     return newCircle
// }
// let obj = {
//     radiusss: 4
// }
// console.log(createCircle(obj))

//函数类型接口
// interface CompareFunc {
//     (first: number, last: number): boolean
// }
// let myCompare: CompareFunc = function (first: number, last: number): boolean {
//     return first > last
// }
//遵循整体规范
// let myCompare: CompareFunc = function (a: number, b: number): boolean {
//     return a > b
// } 
// let myCompare: CompareFunc = function (a, b): boolean {
//     return a > b
// }
// let myCompare: CompareFunc = function (a, b) {
//     return a > b
// }

//可索引类型（了解）
// interface StrArr {
//     [index: number]: string
// }
// let myArr: StrArr = ['it', 'good']
// let str: string = myArr[0]
// console.log(str)

//类类型
// interface ClockInterface {
//     currentTime: Date//属性
// }
// class Clock implements ClockInterface {
//     currentTime: Date;
//     constructor(h: number, m: number) {
//         console.log(h, m)
//     }
// }

// interface ClockInterface {
//     currentTime: Date,
//     setTime(d: Date)//方法
// }
// class Clock implements ClockInterface {
//     currentTime: Date;
//     setTime(d: Date) {
//         console.log(d)
//     }
//     constructor(h: number, m: number) {
//         console.log(h, m)
//     }
// }

//类的静态部分 和 实例部分
// interface ClockConstructor {
//     new(h: number, m: number)
// }
// class Clock implements ClockConstructor {
//     constructor(n: number, m: number) {
//     }
// }

//接口的继承
// interface Animal {
//     breed: string
// }
// interface Cat extends Animal {
//     color: string
// }
// let cat1: Cat = {
//     breed: '蓝猫',
//     color: 'red'
// }

// interface Animal {
//     breed: string
// }
// interface Mammal {
//     leg?: number
// }
// interface Cat extends Animal, Mammal {
//     color: string
// }
// let cat1: Cat = {
//     breed: '蓝猫',
//     color: 'red',
//     leg: 4
// }





























