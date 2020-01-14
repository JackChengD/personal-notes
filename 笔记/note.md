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

3.iOS、android的软键盘弹起问题
> IOS下中，软键盘处于窗口最顶层，与原有的窗口不冲突，所以底部导航条不会被顶起，但是在android下，软键盘与窗口处于同一层，所以当软键盘弹起时，当前窗口缩小，那么窗口内容自然要被挤  
> iOS是覆盖在上面，Android是顶起页面

```


