//泛型
//初体验
// function getNumber(num: number): number {
//     return num 
// }
// function getAny(num: any): any {
//     return num
// }
// getAny(true);//可以传任意的值

//泛型变量
// function getNumber<T>(num: T): T {
//     return num
// }
// getNumber<string>('str')
// getNumber<number>(11)
// getNumber<boolean>(true)
//也可以如下简写，上面是标好给你同事看
// getNumber('str')
// getNumber(11)
// getNumber(true)

// function getNumber<T>(num: T[]): T[] {//传数组
//     console.log(num.length)
//     return num
// }
// console.log(getNumber([1,2]));


//泛型类
/*
    泛型类使用(`<>`)括起泛型类型，跟在类名后面
    类有两个部分：静态部分和实例部分
    泛型类指实例部分的类型，所以类的静态属性不能使用这个泛型类型
 */

// class Add<T>{
//     x: T
//     y: T
//     zeroValue: T
//     constructor(x: T, y: T) {
//         this.x = x
//         this.y = y
//     }
//     add(): T {
//         console.log(this.x, this.y)
//         return this.x
//     };
// }
// let add = new Add<number>(1, 2)
// console.log(add.add())


//泛型约束
/*
    有时候我们想去操作某类型的一组值，并且我们知道这组值具有什么样的属性
    这时，可以定义一个接口来描述约束条件
*/

// interface LengthWise {
//     length: number
// }

// function getNum<T extends LengthWise>(num: T): T {
//     console.log(num.length)
//     return num
// }
// let num1 = {
//     length: 2
// }
// //传进来的参数要包含length属性
// getNum(num1)
// getNum('100')

//在泛型约束中使用类型参数
/*
    我们可以声明一个类型参数，且它被另一个类型参数所约束
    比如，我们想要用属性名从对象里获取这个属性。并且我们想要确保这个属性存在对象obj上
    因此我们需要在这两个类型之间使用约束
    keyof是索引类型查询操作符
    keyof T
*/

// function getProperty<T, K extends keyof T>(obj: T, key: K) {
//     return obj[key]
// }

// let person = {
//     name: '张三',
//     age: 20
// }
// getProperty(person, 'name')
// getProperty(person, 'age')
// getProperty(person, 'a1ge');//报错,没有这个属性











