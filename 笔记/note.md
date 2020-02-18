## 记录些坑

### 1.element-ui的table表格控件表头与内容列不对齐问题(小屏幕会出现)
> 解决方法：
> 将以下样式代码添加到`index.html`、或者`app.vue`(必须是入口文件，起全局作用)
```css
body .el-table colgroup.gutter{
    display:table-cell !important;
}
```

### 2.div内嵌img，div的高度大于img
> 解决方法：
> 将img设置为块级
```
img{
    display: block
}

```

### 3.iOS、android的软键盘弹起问题
> IOS下中，软键盘处于窗口最顶层，与原有的窗口不冲突，所以底部导航条不会被顶起，但是在android下，软键盘与窗口处于同一层，所以当软键盘弹起时，当前窗口缩小，那么窗口内容自然要被挤  
> iOS是覆盖在上面，Android是顶起页面

### 4.关于箭头函数this
```javascript
    function foo(){
        setTimeout(()=>{
            //这里的this在此继承自foo()
            console.log(this.a)
        },100)
    };
    var obj = {
        a: 2
    };
    foo.call(obj);//2
```
> 完全等同于
```javascript
    function foo(){
        var self = this;
        setTimeout(function(){
            console.log(self.a);
        },100)
    };
    var obj = {
        a: 2
    };
    foo.call(obj);//2
```
> 关于箭头函数只要记住var self = this;就够了  
> 它其实是通过作用域保存当前this上下文传递给回调函数。本质上是抛弃了this的原有的机制

### 5. vue监听某个元素的滚动
> 这次因为css设置了以下，导致滚动的时候document不会改变，这时候可以给你需要的dom绑定滚动事件通过vue的@scroll
```css
.content-wrapper{
  height: 100%;
  overflow: hidden;
  position: relative;
  }
..content {
  height: 100%;
  overflow: auto;
  }
```

```html
  <div class="content-wrapper">
    <div @scroll="listenScroll" class="content">
  </div>
```

```javascript
    listenScroll(event) {
      const el = event.currentTarget;
      const scrollTop = el.scrollTop;

      //这里刚好根据个人业务写了点代码
      const fixedheader = this.$refs.fixedheader;
      const offsetTop = fixedheader.offsetTop;
      if (scrollTop > offsetTop) {
        this.fixedFlag = true;
      } else {
        this.fixedFlag = false;
      }
    }
```

### 6. 多行文本垂直居中 
```html
<div class="p_box bg_box">
	<p class="words_p">
		方法二：对子元素设置display:inline-block属性，使其转化成行内块元素，模拟成单行文本。父元素设置对应的height和line-height。对子元素设置vertical-align:middle属性，使其基线对齐。添加line-height属性，覆盖继承自父元素的行高。缺点：文本的高度不能超过外部盒子的高度。
	</p>
</div>
```
```css

.p_box {
	line-height: 300px;
}
.words_p {
	display: inline-block;
	line-height: 20px;  /*单独给子元素设置行高，覆盖父级元素的行高*/
	vertical-align: middle;  /*基线居中对齐*/
}
```

### 7. 一行多出显示省略号
```css
.text{
  width: 200px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap; 
}

```

### 8. 时间倒计时(vue)
```html
  <div id="countDown" class="p-2">
    <span class="span-1">距结束</span>
    <span class="span-2">--</span>
    <span class="span-1">天</span>
    <span class="span-2">--</span>
    <span class="span-1">:</span>
    <span class="span-2">--</span>
    <span class="span-1">:</span>
    <span class="span-2">--</span>
  </div>
```

```js
//倒计时
    countdown() {
      let time = setInterval(() => {
        let timenow = new Date();
        let time2020 = new Date(2020, 1, 9, 18, 0, 0); //指定时间
        //     参数说明：
        // 　　year的值为：需设定的年份-1900。例如需设定的年份是1997则year的值应为97，即1997-1900的结果。所以Date中可设定的年份最小为1900；
        // 　　month的值域为0～11，0代表1月，11表代表12月；
        // 　　date的值域在1～31之间；
        // 　　hrs的值域在0～23之间。从午夜到次日凌晨1点间hrs=0，从中午到下午1点间hrs=12；
        // 　　min和sec的值域在0～59之间。
        let cz = time2020.getTime() - timenow.getTime();
        // if (cz < 0) {
        //   clearInterval(time);
        // }
        let day = parseInt(cz / (24 * 60 * 60 * 1000));
        cz = cz % (24 * 60 * 60 * 1000);
        let hours = parseInt(cz / (60 * 60 * 1000));
        cz = cz % (60 * 60 * 1000);
        let minute = parseInt(cz / (60 * 1000));
        cz = cz % (60 * 1000);
        let second = parseInt(cz / 1000);

        let span = document
          .getElementById("countDown")
          .getElementsByClassName("span-2");
        // console.log(span);
        span[0].innerHTML = this.timeFilter(day);
        span[1].innerHTML = this.timeFilter(hours);
        span[2].innerHTML = this.timeFilter(minute);
        span[3].innerHTML = this.timeFilter(second);
        if (second <= -1) {
          //如果溢出就为0并清除定时器
          span[0].innerHTML = '00';
          span[1].innerHTML = '00';
          span[2].innerHTML = '00';
          span[3].innerHTML = '00';
          clearInterval(time);
        }
      }, 1000);
    },
    timeFilter(item) {
      if (item < 10) {
        return "0" + item;
      } else {
        return item;
      }
    },

```





