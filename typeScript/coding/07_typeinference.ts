//根据你的输入，知道你的类型
//最佳通用类型
// let num = 10;//number
// let str = '1';//string
// let arr = [0, 10, true, null];//(number|boolean|null)[]

// class Animal {
//     breed: string
// }
// class Dog extends Animal { }
// class Cat extends Animal { }
// let zoo1 = [new Dog(), new Cat()]//(Dog|Cat)[]  
// let zoo2: Animal[] = [new Dog(), new Cat()]//Animal[]  

//上下文类型--如果有参数类型注解，上下文就会被忽略
// window.onmousedown = function (mouseEvent) {
//     console.log(mouseEvent.target)
// }


// class Animal {
//     breed: string
// }
// class Dog extends Animal { }
// class Cat extends Animal { }

// function createZoo( ): Animal[] {
//     return [new Dog(), new Cat()]
// }











