# git命令的使用

## 简介

>- git是目前世界上最先进的**分布式**版本控制工具，可以有效、高速地处理从很小到非常大的项目版本管理，是 Linus Torvalds 为了帮助管理 Linux 内核开发而开发的一个开放源码的版本控制软件。

### git的优势

>- 可以离线工作
>- 便于协作
>- 便于使用分支
>- 版本合并容易
>- 速度快
>- 灵活性高

### git的常见命令

>- git init 初始化(新建一个文件夹)，将其目录切换至目录上，执行此命令，即可初始化该目录为git
>- git status 查看状态
>- git add filename 将filename添加到git的暂存区
>- git commit 提交(不过一般提交不上去，因为需要填写提交的内容)
>- git commit -m 'message' 提交，提交的信息为message
>- vi filename 修改filename文件
>- cat filename 查看filename内容
>- wq! 退出窗口
>- git log filename 查看日志
>- git log --pretty=online filename 查看filename日志，并且一行显示
>- git diff 查看对比两次文件内容具体修改了什么
>- git diff HEAD -- `<filename>` ("--"前后有空格，可以查看工作区和版本库里面最新版本的区别)
>- git reset --hard HEAD^ 回退一步
>- git reset --hard HEAD^^^ 回退三步
>- git reflog 查看操作
>- git reflog filename 查看详细的操作
>- git reset --hard 43ea01 将版本回退到43ea01时的版本
>- git reset --hard HEAD~3 回退三步
>- git checkout -- 版本回撤
>- git rm -f filename 删除filename
>- git branch -D filename 删除filename
>- git branch dev 新建dev分支
>- git checkout dev / git switch dev 切换到dev分支
>- git merge dev 将dev分支和当前分支合并
>- git merge --no-ff dev -no-ff禁止了快进，会生成一个新的提交(建议使用这种方式合并代码)
>- git checkout -b dev / git switch -c dev 新建dev分支并切换
>- git remote add origin "http:......" 远程添加
>- git push -u origin master 将本地的项目推送到master分支（第一次）
>- git push 将本地的项目推送到master分支
>- git pull origin master 从远程分支master上下载
>- git clone "http:......." 克隆远程master分支
>- git clone -b dev "http:......" 克隆远程dev分支
>- git branch -b dev 删除本地分支
>- git clone -r -d origin/dev
   git push origin :dev    删除远程分支
>- git checkout -b develop origin/develop 本地拉取显示的develop分支代码
>- git commit --amend 修改已提交的commit注释，在vi编辑器改
>- git stash 能够将所有未提交的修改（工作区和暂存区）保存至堆栈中，用于后续恢复当前工作目录
>- git stash pop 恢复之前缓存的工作目录，将缓存堆栈中的对应stash删除，并将对应修改应用到当前的工作目录下，默认为第一个stash，即stash@{0}，如果要应用并删除其他stash，命令：git stash pop stash@{$num},比如应用并删除第二个：git stash pop stash@{1}
>- git stash list 查看stash了哪些存储
>- git stash show 显示做了哪些改动，默认show第一个存储，如果要显示其他存贮，后面加stash@{$num}，比如第二个git stash show stash@{1}
>- git stash drop stash@{$num} 丢弃stash@{$num}存储，从列表中删除这个存储
>- git stash clear 删除所有缓存的stash
