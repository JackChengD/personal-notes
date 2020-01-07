## 记录些坑

1.element-ui的table表格控件表头与内容列不对齐问题(小屏幕会出现)
> 解决方法：
> 将以下样式代码添加到`index.html`、或者`app.vue`(必须是入口文件，起全局作用)
```css
body .el-table colgroup.gutter{
    display:table-cell !important;
}
```

2.div内嵌img，div的高度大于img
> 解决方法：
> 将img设置为块级
```
img{
    display: block
}
```


