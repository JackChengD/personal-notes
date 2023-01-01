# vue的diff算法

入口为patch函数，会传入旧新虚拟dom，然后开始比较旧新虚拟dom是否相同，判断相同的方法(sameVnode)是通过看key、tag、data、isComment(是否是注释节点)、如果是input(type是否一致)，相同的话就会调用patchVnode进行深层对比，如果不同，则会重新使用新的vnode创建新的dom来替换旧的dom。  
patchVnode会对比旧新节点引用是否一致，如果一致则return，接着判断是否是文本节点，如果是并且text不一样就会重新设值text。如果不是文本节点就有判断子节点关系，如果都存在子节点并且子节点不一样，就会调用updateChildren方法，这个方法是diff算法的核心，如果只是新节点存在子节点，则直接创建dom添加进去，如果只是旧节点存在子节点，则删掉旧节点的子节点。如果子节点存在text则置为空。  
接下来详细介绍updateChildren方法。比较的方式采用的是双指针，创建旧新头尾index、，然后进行while循环，循环的条件是旧头index小于等于旧尾index并且新头index小于等于新尾index，接下来会进行空处理，旧头节点为空，旧头index++找下一个，旧尾节点为空，旧尾index--找前一个，新头节点为空，新头index++找一下，新尾节点为空，新尾index--找前一个，然后开始进行比较，比较会进行旧新头节点对比(sameVnode)，如果相同则进行patchVnode方法，这个方法前面说了，然后再将旧新头index++。然后进行旧新尾部节点对比，如果相同进行patchVnode方法，然后旧新尾index--，然后再进行旧头新尾节点对比，如果相同则进行patchVnode，然后将旧头移动到尾部，旧头index++，新尾index--，然后再进行旧尾新头节点对比，如果相同则进行patchVnode，然后将旧尾移动到头部，旧尾index--，新头index++，如果都不符合这四种就是中间对比，这里需要看有没有key，有key就会复用节点，没有的话就需要直接创建节点然后插到旧头index前面位置，有的话进行复用判断是否是同一个节点，是的话调用patchVnode然后插入旧头index前面位置，不是的话直接创建新节点插入旧头index前面，新头index++再下一个。  
while循环结束后，看是为什么结束，如果旧头index大于旧尾index，说明旧节点已经遍历完了，这时候可能还有新节点没有遍历，需要把新节点创建然后插入。如果是新头index大于新尾index，则说明新节点已经遍历完了，这时候可能还有旧节点没遍历，需要把旧头index到旧尾index的旧节点删除。  

参考：https://juejin.cn/book/6844733705089449991/section/6844733705236250632  
参考：https://juejin.cn/post/6844903607913938951  
