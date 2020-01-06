# sql学习

## 简介
>- SQL 是用于访问和处理数据库的标准的计算机语言
>- 菜鸟学习官网https://www.runoob.com/sql/sql-tutorial.html

### 简单的增删查改
```sql
//在style表插入id、name、url、alexa、country
insert into style(id,name,url,alexa,country) 
values(10,'微软','www.microsoft.com',2,'USA');

//在style表中id为10的alexa设置为3
update style set alexa =3 
where id = 10;

//在style表中查看id为10的所有字段
select * from style 
where id = 10;

//在style表中删除id为10的数据
delete from style 
where id = 10;

//在style表中查看前2条的所有字段
select * from style 
limit 2;

//在style表中查看id降序限制前5条的所有字段，order默认升序asc
select * from style 
order by id desc 
limit 5;

//在style表中查看name为g开头的所有字段，%代表任何字符都可以
select * from style 
where name like 'g%';

//在style表中查看name为g结尾的所有字段，%代表任何字符都可以
select * from style 
where name like '%g';

//在style表中查看url包含oo的所有字段，%代表任何字符都可以
select * from style 
where url like '%oo%';

//在style表中查看name为任意一个字符开头后接oogle的所有字段，_代表任何一个字符都可以
select * from style 
where name like '_oogle';

//在style表中查看name以g/F/百开头的所有字段，不区分大小写
select * from style 
where name regexp '^[gF百]';

//在style表中查看name以a-h/百开头的所有字段
select * from style 
where name regexp '^[A-H百]';

//在style表中查看name不以a-h/百开头的所有字段
select * from style 
where name regexp '^[^A-H百]';

//在style表中查看name为google或者百度的所有字段
select * from style 
where name in ('google','百度');

//在style表中查看name为google的所有字段，binary区分大小写
select * from style where binary name='google';

//在style表中查看id范围在2到10，包含2和10
select * from style 
where id between 2 and 10;

//在style表中查看id范围不在2到10，也不在2和10
select * from style 
where id not between 2 and 10;

//在style表中查看date范围在2019-12-26到2020-01-01，包含2019-12-26和2020-01-01
select * from style 
where date between '2019-12-26' and '2020-01-01';

//在style表和log表中查看style的id字段和log的id字段相等时的style.id,style.name,log.count,log.date
select style.id,style.name,log.count,log.date
from style
inner join log
on style.id = log.site_id;


//将style和app表的country字段找出来升序，不重复
select country from style
union
select country from app
order by country;

//将style和app表的country字段找出来升序，重复
select country from style
union all
select country from app
order by country;

//创建persons表，id为主键、自增字段、不为空
create table persons
(
id int not null auto_increment,
last_name varchar(255) not null,
first_name varchar(255),
address varchar(255),
city varchar(255),
primary key(id)
)

//找出log表中大于count平均值的site_id和count字段
select site_id,count from log
where count > (select avg(count) from log);

//统计style表中alexa的个数（不重复），alexa为null不算
select count(distinct alexa) from style;

//在style查看id最大的字段
select max(id) from style;

//在style查看id最大的所有字段
select * from style
where id = (select max(id) from style);

//在style查看id最小的字段
select min(id) from style;

//在style查看id最小的所有字段
select * from style
where id = (select min(id) from style);

//在style查看alexa的所有字段值得和
select sum(alexa) as sum_alexa from style;

//在log表查看site_id的count总情况
select site_id, sum(count) as num
from log
group by site_id;


//在log表查找字段count值大于 200
select style.name, style.url, sum(log.count) as nums from(log
inner join style
on log.site_id = style.id)
group by style.name
having sum(log.count) > 200;

//在log表查找字段count值大于 200，并且style表字段alexa小于 200
select style.name, sum(log.count) as nunms from style
inner join log
on style.id = log.site_id
where style.alexa < 200
group by style.name
having sum(log.count) > 200;

//将style表中name字段值转成大写
select ucase(name) from style;

//将style表中name字段值转成小写
select lcase(name) from style;

//将style表中的name提取1-4个字符
select mid(name,1,4) from style;

//将style表中的name的字符串长度
select length(name) from style;

//将style表中的id四舍五入
select round(id) from style;

//查看style表的所有字段和当前时间
select *, now() as date from style;

//查看style表的所有字段和当前格式化的时间
select *, date_format(now(), '%Y-%m-%d') as date from style;

```

### 例子
#### 举例1
```sql
//创建表
create table if not exists score(sname varchar(10), cname varchar(5),grade integer) charset=utf8;
insert into score(sname,cname,grade)
values ('张三','数学',80),
       ('张三','语文',90),
       ('张三','英语',70),
       ('张三','物理',60),
       ('李四','数学',66),
       ('李四','语文',60),
       ('李四','英语',80),
       ('李四','物理',90),
       ('刘志麟','语文',99),
       ('刘志麟','数学',50),
       ('刘志麟','英语',50),
       ('刘志麟','物理',89),
       ('罗宇航','语文',99),
       ('罗宇航','数学',80),
       ('罗宇航','物理',78),
       ('罗宇航','英语',96),
       ('许振东','数学',96),
       ('许振东','语文',96),
       ('许振东','英语',96),
       ('许振东','物理',96);

# 1. 查询90分以上的学生的课程名和成绩
select * from score
where grade > 90;

# 2. 查询每个学生的成绩在90分以上的各有多少门
select sname, count(cname) from score
where grade > 90
group by sname
having count(cname);

# 3. 至少有两门课程在90分以上的学员以及90分以上的课程数 
select sname,count(cname) from score
where grade > 90
group by sname
having count(cname) > 2;

# 4. 平均成绩比张三的平均成绩高的学员和其平均分
select sname,avg(grade) from score
group by sname
having avg(grade) > (select avg(grade) from score where sname = '张三');

# 5. 查询平均成绩大于90分并且语文课95分以上的学生名和平均成绩
select sname,avg(grade) from score
where sname in (select sname from score
where cname = '语文' and grade > 95)
group by sname
having avg(grade) > 90;

# 6. 查询每个学员的平均分和学生名
select sname,avg(grade) from score
group by sname;

# 7. 查询每门课的最好成绩和平均分
select max(grade),avg(grade) from score
group by sname;

# 8. 查询数学课成绩最好的学员的所有成绩
select * from score
where sname in (select sname from score
where grade = (select max(grade) from score where cname = '数学')and cname = '数学');

# 9. 查询学员及其总分,按总分降序排列
select sname,sum(grade) from score
group by sname
order by sum(grade) desc;

```

#### 举例2
```sql
//建表
create table if not exists employee(eid integer auto_increment primary key,name varchar(5),age integer,salary integer,depart varchar(5),workage integer) charset=utf8;
insert into employee (name,age,salary,depart,workage)

values ('崔铭','25',1500,'研发部',3),
       ('佳伟','23',1000,'市场部',2),
       ('刘涵','30',10600,'人事部',6),
       ('孙铭泽','25',2000,'运营部',5),
       ('张吉龙','21',15000,'生产部',12),
       ('从好平','22',1500,'质量部',3),
       ('杨忠','22',5000,'财务部',4),
       ('芦淞','24',6000,'采购部',7),
       ('马玉','25',450000,'销售部',29),
       ('成林','21',12000,'安全部',10),
       ('张龙','32',17000,'研发部',21),
       ('王建业','25',11000,'研发部',7),
       ('王佳敏','22',10000,'市场部',9),
       ('姜佳伟','27',10000,'人事部',13),
       ('王国栋','20',10012,'研发部',2),
       ('周昌洋','38',10560,'研发部',1),
       ('刘鑫鑫','18',1900,'人事部',6),
       ('刘博','21',2000,'研发部',11),
       ('乔鑫','19',13000,'运营部',12),
       ('宇航','20',10500,'生产部',21),
       ('赵浩然','33',10400,'总经理',21),
       ('常盛','24',1000,'生产部',2),
       ('刘麟','25',3000,'武装部',8);

# 1. 查询每个部门的总薪资
select depart,sum(salary) from employee
group by depart;

# 2. 员工数超过3人的部门的最高薪资和最低薪资
select depart,max(salary),min(salary) from employee
group by depart
having count(*) > 3;

# 3. 工龄超过3年的员工中,薪资最低的所有员工信息
select * from employee
where salary in (select min(salary) from employee where workage > 3);

# 4. 工龄超过3年的员工数大于3的部门
select depart,count(*) from employee
where workage > 3
group by depart
having count(*) > 3;

```


### 事务
> 在执行SQL语句的时候，某些业务要求一系列操作必须全部执行，而不能仅执行一部分。例如，一个转账操作：
```sql
从id=1的账户给id=2的账户转账100块
第一步：将id=1的A账户余额减去100
update account set balance = balance-100 where id = 1;
第二步：将id=2的B账户余额加上100
update account set balance = balance+100 where id = 2;
```
> 这两条SQL必须全部执行，或者由于某些原因，如果第一语句成功，第二条语句失败，就必须全部撤销
> 这种把多条语句作为一个整体进行操作的功能，被称为数据库**事务**。数据库事务可以确保该事务范围内的所有操作都可以全部成功或者全部失败。如果事务失败，那么效果就和没有执行这些SQL一样，不会对数据库有任何改动。
> 可见，数据库事务具有ACID这4个特性：
>- A：Atomic，原子性，将所有SQL作为原子工作单元执行，要么全部执行，要么全部执行
>- C：Consistent，一致性，事务完成后，所有数据的状态都是一致的，即A账户只要减了100，B账户则必定加上100
>- I：Isolation，隔离性，如果有多个事务并发执行，每个事务做出的修改必须与其他事务隔离
>- D：Duration，持久性，即事务完成后，对数据库数据的修改被持久存储

> 对于单条SQL语句，数据库系统自动将其作为一个事务执行，这种事务被称为隐式事务
> 要手动把多条SQL语句作为一个事务执行，使用BEGIN开启一个事务，使用COMMIT提交一个事务，这种事务被称为一个显式事务，例如，把上述的转账操作作为一个显示事务：
```sql
begin
update accounts set balance = balance - 100 where id = 1;
update accounts set balance = balance + 100 where id = 2;
commit;
```
> 很显然多条SQL语句要想作为一个事务执行，就必须使用显示事务
> COMMIT是指提交事务，即试图把事务内的所有SQL所作的修改永久保存。如果COMMIT语句执行失败了，整个事务也会失败。
> 有些时候，我们希望主动让事务失败，这时，可以用ROOLBACK回滚事务，整个事务会失败：
```sql
begin
update account set balance = balance - 100 where id = 1;
update account set balance = balance + 100 where id = 2;
rollback;
```
> 数据库事务是由数据库保证的，我们只需要根据业务逻辑使用它就可以






