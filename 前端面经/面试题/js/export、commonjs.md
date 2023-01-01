# export、commonjs

## 区别

commonjs
> module.exports = {} / exports.name = 14 / require;
> 可以动态导入加载语句，代码发生在运行时
> 混合导出，还是同一种语法，只不过不用声明前面的对象而已，当导出引用对象时之前的导出就会被覆盖
> 导出值时拷贝，可以修改导出的值，这在代码出错误时，不好排查，引起变量污染

esmodule
> export / export default / import;
> 静态的，不可以动态加载语句，只能声明在该文件的最顶部，代码发生在编译时
> 混合导出、单个导出、默认导出，完全互不影响
> 导出是引用值之前都存在映射关系，并且值是可读的，不能修改

参考: https://blog.csdn.net/weixin_44165167/article/details/114688927
