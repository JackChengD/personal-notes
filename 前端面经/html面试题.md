# html面试题

1.html与xhtml的区别
>- xhtml要求正确的嵌套
>- xhtml所有元素必须闭合
>- xhtml区别大小写，xhtml所有标签和属性都要小写
>- xhtml的属性必须加引号
>- xhtml用id属性替换name属性
>- xhtml属性值不能简写

2.块级元素和内联级元素的区别
1. block(块)元素的特点
>- 总是在新行上开始
>- 高度，行高以及外边框和内边框都可控制
>- 宽度缺省是它的容器的100%，除非设定一个宽度
>- 它可以容纳内联元素和其他块元素
2. inline元素的特点
>- 和其他元素都在一行上
>- 不可以设置宽高
>- 宽度就是它的文字或图片的宽度，不可改变
>- 内联元素只能容纳文本或者其他内联元素
3. 常见的块级元素
>- address-地址、div-常用块级容器，也是css layout的主要标签、form-交互表单、h1-大标题
>- h2-副标题、h3-3级标题、h4-4级标题、h5-5级标题、h6-6级标题、hr-水平分隔线、menu-菜单列表
>- ol-有序表单、p-段落、table-表格、ul无序列表
4. 常见的内联元素
>- a-描点、b-粗体、br-换行、em-强调、i-斜体、img-图片、input-输入框、label-表格标签
>- q-短引用、select-项目选择、strong-强调、sub-下标、sup-上标

3.html5与html4的区别
1. html头部
>- html5：`<!doctype html>`
>- html4: `<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd" >`
2. html编码`
>- html5: `<mata charset='utf-8'>`
>- html4: `<meta http-equiv="content-type" content="text/html;chatset=utf-8">`

3. 引入css样式
>- html5: `<link rel="stylesheet" href="domo.css">`
>- html4: `<link type="text/css" rel="stylesheet" href="demo.css">`

4. 引入js文件
>- html5: `<script src="demo.js"></script>`
>- html4: `<script type="text/javascript> src="demo.js">`

4.meta标签有什么理解
>- 提供给页面一些元信息（名称/值对），比如针对搜索引擎和更新频度的描述和关键字
>- name：名称/值对中的名称。常用有author、description、keywords、viewport、generator
> revised、others。把content属性关联到一个名称
>- http-equiv：没有name时，会采用这个属性的值，常用有content-type、expires、refresh
> set-cookie。把content属性关联到http头部
>- content：名称/值对中的值，可以是任何有效的字符串。始终是和name属性或http-equiv属性一起
> 使用
>- scheme：用于指定要用来翻译属性值的方案

5.html5的十大新特性
>- 语义标签、增强型表单、视频和音频、Canvas绘图、SVG绘图、地理定位、拖放API、
>WebWorker、WebStorage、WebSocket
>- 可参考 `https://www.cnblogs.com/vicky1018/p/7705223.html`

6.html中`<input>`和<`textarea>`的区别
>- 在html中有两种方法表示文本框，一种是`<input>`元素的单行文本框，一种是`<textarea>`的多
> 行文本框
1. `<input>`元素：
>- 一定要指定type的值为text；
>- 通过size属性指定显示字符的长度，value属性指定初始值，Maxlength属性指定文本框可以输入的
> 最长的长度
>- 表单有两个type不是submit的input不会自动提交（回车提交），表单只会有一个input自动提交，
> 有一个type为submit的按钮或是input会自动提交
> 用法：`<input type="text" value="入门" Maxlength="15"/>`
2. `<textarea>`元素
>- 内容放在textarea标签对中
>- 使用rol、col指定大小
>- 用法：`<textarea row="3" col="4">入门</textarea>`

7.Doctype作用？标准模式与兼容模式的区别
>- Doctype声明位于html文档的第一行，处于html标签之前。告知浏览器的解析器用什么文档标准解析
>这个文档，doctype不存在或格式不正确会导致文档以兼容模式呈现。标准模式的排版和js运行模式都是
>以该浏览器支持的最高标准运行的。在兼容模式中，页面以宽松的向后兼容的方式显示，模拟老式浏览器
>的行为以防止站点无法工作。

8.ie各版本和chrome可以并行下载多少个资源？
>- ie6两个并发、ie7升级之后六个并发、之后版本也是六个
>- Firefox、chrome也是6个

9.html代码中如何做SEO？
>- h标签合理使用，strong标签语义比较强、合理使用
>- title、`<meta name="description"/>`、`<meta name="keywords"/>`要合理设置
>- a标签要和title、img要写alt
>- div要有合理类名、比如.content、.header、.address，便于搜索引擎爬虫检索
>- html层次清晰，id不要重复，便于搜索引擎怕从检索

10.什么是语义化的html
>- 用合理、正确的标签来展示内容，比如h1-h6定义标题
>- 易于用户阅读、样式丢失的时候让页面也能呈现清晰的结构
>- 有利于SEO，搜索引擎根据标签来确定上下文和各个关键字的权重。
>- 有利于开发和维护，语义化更具可读性，代码更好维护，与CSS3关系更和谐

11.cookie、localStorage和sessionStorage的区别
1. 共同点：保存在浏览器，且同源
2. 区别：
>- cookie数据始终保存在同源的http请求中携带（即使不需要），即cookie在浏览器和服务器间来回传
> 递。而sessionStorage和localStorage不会自动把数据发给服务器，仅在本地保存
>- cookie数据不超多4k（4095），同时因为每次http请求都会携带cookie，所有cookie只适合保存很
>小的数据，如会话标识。sessionStorage和localStorage虽然也有存储大小的限制，但比cookie大得
>多，可以达到5m或者更大
>- 数据有效期不同，sessionStorage仅在当前浏览器窗口关闭有效，自然也就不可能做持久保存；
>localStorage始终有效，窗口或浏览器关闭也一直保存，因此可做持久化数据；cookie只在设置的
>cookie过期时间之前一直有效，即使窗口或浏览器关闭
>- 作用域不同，sessionStorage不在不同的浏览器窗口中共享，即使是同一个页面。localStorage、
>cookie在所有同源窗口中都是共享的
>- WebStorage支持事件通知机制，可以将数据更新的通知机制，可以将数据更新的通知发送给监听者
>WebStorage的api接口使用更方便











