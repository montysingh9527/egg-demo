module.exports = (app) => {
  const { mongoose } = app;
  // 引入模式对象
  const { Schema } = mongoose;
  // 创建约束对象
  const mySchema = new Schema({
    name: { type: String },
    val: { type: String },
    create_time: { type: Date },
    // 创建时间
    createdAt: { type: Date, default: Date.now },
    // 更新时间
    updatedAt: { type: Date, default: Date.now },
    // 点赞状态
    like: { type: Number,
      enum: [1, -1], // 喜欢 1，不喜欢 -1
      required: true
    },
    // 点赞用户
    user: { type: mongoose.ObjectId, ref: 'User', required: true },
    username: { type: String, maxlength: [ 10, '长度不能超过10' ], minlength: [ 2, '长度不能小于2' ] },
    mobile: { type: String, unique: true, match: [ /^1\d{10}$/, '手机号码格式不对' ] },
    email: { type: String, match: [ /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/, '邮箱格式不对' ] },
  });
  // 创建模型对象
  const Model = mongoose.model("User", mySchema);

  return Model;
};
