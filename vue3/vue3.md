# Vue3

## 特点
> 更快  
> 更小  
> 更易于维护  
> 更多的原生支持  
> 更易于开发使用  

## 让Vue更快
### 重写虚拟DOM(Virtual DOM Rewrite)
> 随着虚拟DOM重写，我们可以期待更多的 **编译时(compile-time)** 提示来减少 **运行时(runtime)** 开销。重写将包括更有效的代码来创建虚拟节点

### 优化插槽生成(Optimized Slots Generation)
> 在当前的Vue版本中，当父组件重新渲染时，其子组件也必须重新渲染(11月20日更新：这句话是不严谨的，非常容易产生误导，我觉得有必要说明一下：2.0组件的重新渲染就是组件粒度的，除非修改的数据是子组件的props，才会触发子组件的重新渲染。使用Vue3，你可以单独重新渲染父组件和子组件)

### 静态树提升(Static Tree Hoisting)
> 使用静态树提升，这意味着Vue3的编译器将能够检测到什么是静态组件，然后将其提升，从而降低了渲染成本。它将能够跳过未整个树结构打补丁的过程

### 静态属性提升(Static Props Hoisting)
> 此外，我们可以期待静态属性提升，其中Vue3将跳过不会改变节点的打补丁过程

### 基于Proxy的观察者机制
> 目前，Vue的反应系统是使用Object.defineProperty的getter和setter，但是Vue3将使用ES2015的Proxy作为其观察者机制。这消除了以前存在的警告，使速度加倍，并节省了一半的内存开销  
> 为了继续支持IE11，Vue3将发布一个支持旧观察者机制和新Proxy版本的构建

## 使Vue更小
> Vue已经非常小了，在运行时(runtime)压缩后大约20kb。但我们可以期待它会变的更加小，新的核心运行时压缩后大概10kb。这将很大程度上消除不使用的库(也称为Tree Shaking)来实现。例如，如果您没有使用过渡(transition)元素，则不会包含它

## 使其更具可维护性
> 虽然大多数Vue开发人员都没有在库本身上工作，但很高兴知道Vue3将带来更多可维护的源代码。它不仅会使用TypeScript，而且许多软件包将被解耦，使所有内容更加模块化

## 更多的原生支持
> 运行时内核也将与平台无关，使得Vue可以更容易地与任何平台(例如Web、IOS或Andorid)一起使用

## 更易于开发使用
> Observer模块已被解压缩到自己的包中，允许你以新的方式使用它：
>- 跟踪重新渲染的位置也会更容易。在Evan的演讲中，他做了一些实时编码，并展示了如何跟踪Vue应用程序来找出触发组件重新渲染的内容。这在更大的应用程序和性能微调中非常有用
>- Vue3还会改进TypeScript的支持，允许在编译器中进行高级的类型检查和有用的错误和警告

### 实验性的Hooks API
> 当我们需要在Vue中共享两个组件之间的行为时，我们通常使用Mixins。然而，Evan正在尝试使用Hooks API来避免来自Mixis的一些问题，并且更适合使用惯用的Vue代码

### 实验性的Time Slicing支持
> 当您有许多组件同时尝试重新渲染时，任何浏览器都可以开始变的很慢，从而使用户体验下降  
> Evan展示了他如何尝试使用Time Slicing，将JS的执行分解为几个部分，如果有用户需要处理，这些部分将提供给浏览器

## 参考
> https://vue-composition-api-rfc.netlify.com/#basic-example

## 组件中的用法
```html
<template>
  <button @click="increment">
    Count is: {{ state.count }}, double is: {{ state.double }}
  </button>
</template>

<script>
import { reactive, computed, onMounted, watch } from 'vue'

export default {
  //setup相当于vue的beforeCreate+created
  //reactive相当于data数据
  setup() {
    //ref一般定义基本类型，reactive定义引用类型
    //参考：https://www.jianshu.com/p/db5b8a9ec966
    const state = reactive({
      count: 0,
      double: computed(() => state.count * 2)
    })
    const x = ref(0);//

    //生命周期钩子只能在setup调用，vue3写法在开头加了个on
    onMounted(() => {
      console.log('component is mounted!')
    })

    watch(() => console.log(state.count))

    function increment() {
      state.count++
    }

    return {
      state,
      increment
    }
  }
}
</script>

```
