//字符串
// let dogName: string = '小狗'
// let dogAge: number = 3;
// let introDog = `${dogName}今年${dogAge}岁`
// console.log(introDog)

//进制
//2 8 10 16
// let num1: number = 0x10;
// let num2: number = 16;
// let num3: number = 0o20;
// let num4: number = 0b10000;
// console.log(num1, num2, num3, num4)

//布尔
// let flag: boolean = false;
// console.log(flag)

//数组
// let numArr: number[] = [1, 2, 3];
// let strArr: string[] = ['1', '2', '3'];
// let booleanArr: Array<boolean> = [true, false];//数组泛型，这种用的比较多
// console.log(numArr, strArr, booleanArr)

//元组Tuple
// let tuple1: [string, number, boolean, string] = ['1', 2, false, '3'];
// console.log(tuple1)

//枚举
// enum Sex {
//     Man,
//     Wonmen
// }

// enum Color {
//     red,
//     green,
//     blue
// }
// let sex1: Sex = Sex.Man;
// let sex2: Sex = Sex.Wonmen;
// let red: Color = Color.red;
// let green: Color = Color.green;
// let blue: Color = Color.blue;
// console.log(sex1, sex2, red, green, blue);//0 1 0 1 2
// console.log(typeof (sex1), typeof (sex2),typeof (red),typeof (green),typeof (blue));//number ....

// 手动赋值
// enum Sex {
//     Man = 3,
//     Wonmen
// }
// enum Color {
//     red = 6,
//     green = 8,
//     blue = 3
// }
// let sex1: Sex = Sex.Man;
// let sex2: Sex = Sex.Wonmen;
// let red: Color = Color.red;
// let green: Color = Color.green;
// let blue: Color = Color.blue;
// console.log(sex1, sex2, red, green, blue);//3 4 6 8 3
// console.log(typeof (sex1), typeof (sex2), typeof (red), typeof (green), typeof (blue));//number ....
// let sexName: string = Sex[3];
// console.log(sexName);
// console.log(Sex)
// console.log(Color)

//any任何类型
// let aa:any;
// aa = 'Jack';
// console.log(aa);
// aa = 123;
// console.log(aa)
// aa = false;
// console.log(aa)

// let aa:any[];
// aa = ['Jack',321,false];
// console.log(aa)

//void没有类型
// let str: void = 10//报错
// let str1: void = null;
// let str2: void = undefined
// function logMsg():void{//没有返回值
//     console.log('it good')
// }
// logMsg()

//null、undefined
// let str1: null = null;
// let str2: undefined = undefined;
// let str3: undefined = null;
// let str4: null = undefined;
// console.log(str1, str2, str3, str4)
// let str5: null = 1;//报错;
// let str6: undefined = 2;//保存

//never
//永不存在的值的类型：抛出异常的函数、不会有返回值的函数表达式，箭头函数表达式的返回值类型
//是任何类型的子类型，也可以赋值给任何类型
//never没有子类型，任何类型都不可以赋值给never类型(除了never本身)

// function error(msg: string): never {
//     throw new Error(msg)
// }
// error('出错了')

//object
// let obj: object = {
//     name: '张三',
//     age: 18
// }
// console.log(obj)
// declare function fn(o: object): void
// fn({ name: '1' })
// fn([1, 2, 3, 4])
// fn(null)
// fn(undefined);

//类型断言
// let obj: any = 'it good'
// let str: string = obj.substr(0, 3);//调用string的substr无提示
// console.log(str)
// let str1: string = (<string>obj).substr(0,3);//告诉编译器是string类型，调用substr就会有提示
// console.log(str1)
//常用as
// let str2: string = (obj as string).substr(0, 3);
// console.log(str2)


// let [first,hti, ...second] = [1, 2, 3, 4, 5];

// enum Sex {
//     Man,
//     Wonmen
// }

// interface Person {
//     name1: string,
//     age1: number,
//     sex1: Sex
// }

// let person: Person = {
//     name1: '小虎',
//     age1: 13,
//     sex1: Sex.Man
// }

// //@ts-ignore
// let { name1, age1, sex1 } = person

// console.log(name1, age1, sex1)















