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
var Add = /** @class */ (function () {
    function Add(x, y) {
        this.x = x;
        this.y = y;
    }
    Add.prototype.add = function () {
        console.log(this.x, this.y);
        return this.x;
    };
    ;
    return Add;
}());
var add = new Add(1, 2);
console.log(add.add());
