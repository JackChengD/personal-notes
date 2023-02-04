# dns解析

在浏览器缓存找，有就直接返回  
在操作系统找，有就直接返回  
在本地hosts文件找，有就直接返回  
在dns服务器缓存找，有就返回  
都没有得话，就会在dns服务器进行递归查询  
询问根域名.com，获取顶级域名 baidu.com 的 NS(Name Server) 和 A(Address)，NS为顶级域名的名字，A即NS对应的ip地址  
询问顶级域名，获取二级域名 www.baidu.com 的NS 和 A  
最后，将www.baidu.com的ip地址返回给用户，并且缓存  
用户获取到真正的ip地址，并且缓存  
