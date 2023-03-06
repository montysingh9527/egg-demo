module.exports = (app) => {
  const mongoose = app.mongoose;

  const RoleSchema = new mongoose.Schema({
    name: { type: String, unique: true, required: true },
    pwd: { type: Number, unique: true, required: [true, "密码不能为空"] },
    password: { type: String, required: true, select: false }, // 隐私字段 select: false
    access: { type: String, required: true, default: "user" },
    extra: { type: mongoose.Schema.Types.Mixed },
    createdAt: { type: Date, default: Date.now },
    address: { country: String, city: String, area: String },
    roles_log: { type: Array },
    tag: { type: [] },
    categories:[{ type: ObjectId, required:[true,"请选择产品分类"], ref: "Categories"}],
    prices: [{ name: String, retail: Number, cost: Number}],
    careate_time: { type: Date },
    author: { type: ObjectId },
    following: {
      type: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    },
    id: {
      type: Number,
      unique: true,
      require: true,
      default: () => app.createUuid(6, 10), // 用函数的方法，就不会每次都是固定值了
    },
    createdDate: { type: Date, default: () => new Date() },
    age:{
      type: Number, // 类型
      required: true, // 校验规则 - 必须
      default: 18,  // 默认值
      min: [ 10, '年龄不能小于10' ], // 校验规则
      validate: { // 自定义校验方法
        validator(v) {
          return v <= 100;
        },
        message: '{VALUE} 必须小于等于100',
      },
      unique: true, // 是否是唯一的
      trim: true, // 去掉首位空格
      minlength: 3, //  最小长度
      maxlength: 18,  //  最大长度
      enum:[9,12,15], //age的值必须要9,12,15 
    },
    roles_val: [],
  }, 
  // Schema 第二个参数
  {
    versionKey: false, // 去除版本锁  __v0
    // timestamps: false, // timestamps: false 去除两个字段 createTime updateTime
    timestamps: {createdAt:"create_time", updateAt:"update_time"},  // 自动管理创建修改时间
    toObject: { // 属性配置 - 转换成对象时会被调用
      virtuals: true, // 允许虚拟属性
      transform(doc, ret) { // 对返回对象做处理
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
  });
  // 多加上一个虚拟字段。 查询出来的结果result并不会包含roles的内容，要特别指定出来才会显示result.roles
  RoleSchema.virtual("user", { // "user"要虚拟出来的字段名
    ref: "User", // 要连接的集合（表）
    localField: "roles_val", // Role本地字段
    foreignField: "val", // User集合的字段。连接到user.js中val字段
  });

  // 定义虚拟属性
  RoleSchema.virtual('Age').get(function() { 
    return this.age + '岁'; 
  });

   // 定义静态函数，可以封装一些便捷功能
  RoleSchema.statics.findByAge = function(num) { 
    return this.find({
      age: num,
    });
  };
  /**
   * 定义静态函数。 //登录匹配是不是拥有相同的用户名和密码并且没有处于封停状态
   * 静态方法使用：模型类.方法  user.findUserLogin(req.body.username, req.body.password, function (err, userSave) {} )
   */
  user.statics.findUserLogin = function(name,password,callBack){
    this.find({username:name,password:password,userStop:false},callBack);
  };

  // 定义中间件
  RoleSchema.post('validate', function(doc) {
    console.log('%s has been validated (but not saved yet)', doc._id);
  });


  return mongoose.model("Role", RoleSchema);
};
