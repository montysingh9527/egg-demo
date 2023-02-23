### egg-dome

### Development

```bash
$ npm i
$ npm run dev
$ open http://localhost:7001/
```

#### 目录结构  
```
参考：https://www.eggjs.org/zh-CN/basics/structure
egg-project
├── package.json
├── app.js (可选)
├── agent.js (可选)
├── app
|   ├── router.js    用于配置 URL 路由规则
│   ├── controller   用于解析用户的输入，处理后返回相应的结果
│   |   └── home.js
│   ├── service (可选)   用于编写业务逻辑层，可选，建议使用
│   |   └── user.js
│   ├── middleware (可选)   用于编写中间件，可选
│   |   └── response_time.js
│   ├── schedule (可选)
│   |   └── my_task.js
│   ├── public (可选)      用于放置静态资源，可选
│   |   └── reset.css
│   ├── view (可选)
│   |   └── home.tpl
│   └── extend (可选)       用于框架的扩展，可选
│       ├── helper.js (可选)
│       ├── request.js (可选)
│       ├── response.js (可选)
│       ├── context.js (可选)
│       ├── application.js (可选)
│       └── agent.js (可选)
├── config                      用于编写配置文件
|   ├── plugin.js               用于配置需要加载的插件
|   ├── config.default.js
│   ├── config.prod.js
|   ├── config.test.js (可选)
|   ├── config.local.js (可选)
|   └── config.unittest.js (可选)
└── test
    ├── middleware
    |   └── response_time.test.js
    └── controller
        └── home.test.js
```

##### Egg教程
```
https://www.eggjs.org/zh-CN/intro/quickstart
```

##### egg-mongoose 教程
```
https://github.com/eggjs/egg-mongoose
http://www.mongoosejs.net/docs/guide.html
```

##### NodeJs教程
```
http://nodejs.cn/api-v16/fs.html
```


###### 相关项目  egg + mongoose
```
https://github.com/cnodejs/egg-cnode/blob/master/config/plugin.js
https://github.com/heimi-block/egg-RESTfulAPI/blob/master/app/controller/user.js
```

##### 相关项目  egg + mysql
```
https://github.com/Imfdj/vue-beehive
https://github.com/Imfdj/egg-beehive/blob/main/package.json
```

##### 相关教程
```
定时任务、获取网站数据
https://blog.csdn.net/weixin_45248399/article/details/109627425
```


##### mongoose相关
```
https://www.cnblogs.com/shapeY/p/15100786.html

修改： findByIdAndUpdate()


创建：create()
查询：
    Model.find( [过滤规则] , [返回字段]) , [配置项] , callback)  
    返回字段 可以指定需要返回哪些字段，或者指定不需要哪些字段
    配置项可以限制返回条数，排序规则，跳过文档数量（分页）等等。
        findOne()：可以根据字段值查询
        findBy() ： 根据字段查询  例如：findByAge(16) 查询出Age=16的数据

修改：
    updateOne()：修改一个值，$set插入值
删除：
    remove()：  删除数据，可以根据添加删除
```

##### 常用操作符
```
---creat(新增数据)：
  db.集合名.insert(文档对象)
  db.集合名.insertOne(文档对象)
  db.集合名.insertMany(文档对象, 文档对象)

1、 < $lt  <= $lte  > $gt  >= $gte   !== $ne
   示例： db.集合名.find({age:{$gte: 20}}), 年龄是大于等于20的
2、逻辑或：使用$in 或 $or
    查找年龄为18或20的学生
      举例1：db.students.find({age:{$in:[18,20]}})
      举例2：db.students.find({$or:[{age:18},{age:20}]})
3、逻辑非： $nin
4、正则匹配：举例：db.students.find({name:/^T/})
5、$where能写函数：
    db.students.find({$where: function(){
      return this.name === "zhangsan" && this.age === 18
    }})
---read查询
过滤掉不想要的数据,只保留想要展示的数据
  db.集合名.findOne(查询条件[,投影])    默认只要找到一个
  举例：db.students.find({},{_id:0, name:0})   过滤掉id和name
  举例：db.students.find({},{age:1})   只保留age

---update:更新
  db.集合.update(查询条件,要更新的内容,[,配置对象])
    举例：db.students.update({name:"zhangsan"}, {age: 19})

  // 使用$set修改指定内容,其它数据不变,不过只能匹配一个zhangsan
    举例：db.students.update({name:"zhangsan"},{$set: {age: 19}})

  // 修改多个文档对象,匹配多个zhangsan,把所有zhangsan的年龄都替换为19
    举例：db.students.update({name:"zhangsan"},{$set:{age:19}},{multi: true})

  补充：db.集合名.updateOne(查询条件,要更新的内容[,配置对象]) 
       db.集合名.updateMany(查询条件,要更新的内容[,配置对象])
---delete:删除
  db.集合名.remove(查询条件)
    // 删除所有年龄小于等于19的学生
    举例：db.students.remove({age:{$lte:19}})
```

##### 使用说明
```
Model.find( [过滤规则] , [返回字段]) , [配置项] , callback):
const p1 = await Person.find({
      age: {
        $gte: 12, // age大于等于12
      },
      n: {
        $in: [ 'zhao', 'qian' ], // n是[ 'zhao', 'qian' ]中的一个
      },
    }, 
    'n age -_id', // 返回 n age字段，不返回 _id
    { 
      sort: { // 按age降序排序
        age: -1,
      },
      limit: 2, // 只返回两条数据
    });
 
    console.log(p1);
    // [ { age: 18, n: 'qian' }, { age: 17, n: 'qian' } ]
 
    // 以下是通过工具函数的等价写法
 
    const p2 = await Person
      .find({})
      .gte('age', 12)
      .where('n')
      .in([ 'zhao', 'qian' ])
      .select('n age -_id')
      .limit(2)
      .sort({
        age: -1,
      });
 
    console.log(p2);
    // [ { age: 18, n: 'qian' }, { age: 17, n: 'qian' } ]


查询：
Model.findOne | Model.findById()
>>> findOne的使用方式和find一样，适用于只查询一条数据
   const p3 = await Person.findOne({
      age: {
        $gte: 12,
      },
      n: {
        $in: [ 'zhao', 'qian' ],
      },
    }, 'n age -_id', {
      sort: {
        age: -1,
      },
    });
 
    console.log(p3);
    // { age: 18, n: 'qian' }
>>> 如果过滤条件是 _id，可以使用 findById
    const p4 = await Person.findById('61090d4287e3a9a69c50c842', 'n age -_id');


更新
第二种 写法默认不会触发校验(通过配置项可以设置校验)，只会触发特定的中间件；

    // 没有触发校验
    wait Person.updateOne({
      _id: ObjectId('61090d4287e3a9a69c50c842'),
    }, {
      address: 'guizhou',
    });
 
    // 增加配置项 {runValidators: true,} 可触发校验

update系列的方法主要有：
    Model.updateOne()
    Model.updateMany()
    Model.findByIdAndUpdate()
    Model.findOneAndUpdate()
updateOne和updateMany的使用方式基本一致，只是一个只会更新第一条数据，一个会更新所有符合条件的数据。

updateXXX([过滤条件],[更新数据],[配置项],[callback])
过滤条件和find的规则一样
更新数据默认为$set操作符，即更新传入的字段，其他的操作符和mongodb保持一致，查看详情
配置项可配置是否进行校验，是否进行数据覆盖，是否能批量更新等等，不同的方法稍有不同，详见每个API的文档
findByIdAndUpdate 和 findOneAndUpdate 主要是会返回查询到的数据（更新之前的）。

 const a = await Person.findByIdAndUpdate({
      _id: '61090d4287e3a9a69c50c842',
    }, {
      address: 'hubei',
    });
 
    console.log(a);
  // {
  //   age: 16,
  //   _id: 61090d4287e3a9a69c50c842,
  //   n: 'testlei',
  //   address: 'guizhou', // 更新之前的数据
  //   __v: 0
  // }
 
    // 增加 {overwrite: true} 配置可进行数据覆盖


删除
remove系列的方法主要有
    Model.remove() 删除所有符合规则的数据
    Model.findOneAndRemove() 删除符合规则的第一条
    Model.findByIdAndDelete() 根据ID删除
    findOneAndRemove(),Model.findByIdAndDelete() 除了会删除对应的数据，还会返回查询结果。
const a = await Person.remove({
      _id: ObjectId('61090d4287e3a9a69c50c842'),
    });
 
    console.log(a.deletedCount); 
    // 1    
 
    // 删除Persons集合的所有数据
    await Person.remove({});
 
    
    const a = await Person.findOneAndRemove({
      n: 'zhao',
    });
 
    console.log(a);
    // {
    //   age: 16,
    //   _id: 6109121467d113aa2c3f4464,
    //   n: 'zhao',
    //   address: 'hubei',
    //   __v: 0
    // }
```

```
查询常用的过滤规则及对应的工具函数如下：

工具函数	过滤操作符	含义	使用方式
eq()	$eq	与指定值相等	{ <field>: { $eq: <value> } }
ne()	$ne	与指定值不相等	{ <field>: { $ne: <value> } }
gt()	$gt	大于指定值	{field: {$gt: value} }
gte()	$gte	大于等于指定值	{field: {$gte: value} }
lt()	$lt	小于指定值	{field: {$lt: value} }
lte()	$lte	小于等于指定值	{field: {$lte: value} }
in()	$in	与查询数组中指定的值中的任何一个匹配	{ field: { $in: [<value1>, <value2>, ... <valueN> ] } }
nin()	$nin	与查询数组中指定的值中的任何一个都不匹配	{ field: { $nin: [ <value1>, <value2> ... <valueN> ]} }
and()	$and	满足数组中指定的所有条件	{ $and: [ { <expression1> }, { <expression2> } , ... , { <expressionN> } ] }
nor()	$nor	不满足数组中指定的所有条件	{ $nor: [ { <expression1> }, { <expression2> }, ... { <expressionN> } ] }
or()	$or	满足数组中指定的条件的其中一个	{ $or: [ { <expression1> }, { <expression2> }, ... , { <expressionN> } ] }
not()	$not	反转查询，返回不满足指定条件的文档	{ field: { $not: { <operator-expression> } } }
regex()	$regex	可以被指定正则匹配	{ <field>: { $regex: /pattern/, $options: '<options>' } } { <field>: { $regex: 'pattern', $options: '<options>' } } { <field>: { $regex: /pattern/<options> } }
exists()	$exists	匹配存在指定字段的文档	{ field: { $exists: <boolean> } }
type()	$type	返回字段属于指定类型的文档	{ field: { $type: <BSON type> } }
size()	$size	数组字段的长度与指定值一致	{ <field>: { $size: <value> } }
all()	$all	数组中包含所有的指定值	{ <field>: { $all: [ <value1> , <value2> ... ] } }
```