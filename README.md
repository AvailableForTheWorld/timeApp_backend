# timeApp_backend

建议安装**nodemon**

1. 建好数据库
goals           字段：（id int primary key auto_increment, goal varchar(30), task varchar(50), status tinyint) 
finishedtask    字段： (id int primary key auto_increment, item varchar(50),end_time datatime,duration int)
todolist        字段：(id int primary key auto_increment,item varchar(50),cost int)

2. 运行后端
nodemon （这里可以换成node） app.js
