//基本示例
// function max(x: number, y: number): number {
//     return x + y
// }
//匿名函数
// let maxB = function (x: number, y: number): number {
//     return x + y
// }
// let maxC = (x: number, y: number): number => x + y
// let num1: number = 100;
// function fn(num2, num3) {
//     return num1 + num2 + num3
// }
//可选参数
// function max(x: number, y: number) {
//     return x + y
// }
// let res1 = max(10)//报错，少了一个参数
// let res2 = max(10, 12)
// function max(x: number, y?: number) {
//     return x + y
// }
// let res1 = max(10);
// let res2 = max(10, 12)
// function max(x: number, y = 5) {
//     return x + y
// }
// let res1 = max(10);
// let res2 = max(10, 12)
//剩余参数
function sum(x) {
    var reset = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        reset[_i - 1] = arguments[_i];
    }
    return x + reset.reduce(function (prev, next) { return prev + next; });
}
console.log(sum(1, 2, 4, 5, 6, 7));
