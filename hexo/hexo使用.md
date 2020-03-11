# hexo

## 简介
>- 文档：https://hexo.io/zh-cn/api/index.html

### 使用hexo搭建github个人博客
1.安装git

2.安装node

3.安装hexo(npm install hexo --save、npm install -g hexo-cli)

4.初始化项目(hexo init myblog)---耐心等候

5.安装依赖(npm install)

6.文件介绍
>- node_modules:依赖包
>- public：存放生成的页面
>- scaffolds：生成文章的一些模板
>- source：用来存放你的文章
>- themes：主题
>- _config.yml：博客的配置文件

7.hexo g

8.hexo s启动hexo，可以在浏览器localhost:4000查看你的博客

9.git创建个人仓库，命名为xxx.github.io，其中xxx是你注册GitHub的用户名

10.将hexo部署到github
>- 在_config.yml文件
```yml   
    deploy:
        type: git
        repository: git@github.com:JackChengD/JackChengD.github.io.git
        branch: master
```
11.安装deploy-git，这是部署的命令，这样你才能用命令部署到github(npm install hexo-deployer-git --save)

12.hexo clean---清除你之前生成的东西，也可以不加

13.hexo generate---生成静态文章，可以用hexo g缩写

14.hexo deploy---部署文章，可以用hexo d缩写

15.部署成功，通过xxx.github.io可查看，比如https://jackchengd.github.io/


