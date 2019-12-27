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

//在style表中查看name以g/F/百开头的所有字段
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















