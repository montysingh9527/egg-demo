module.exports = (app) => {
  const mongoose = app.mongoose;

  const RoleSchema = new mongoose.Schema({
    name: { type: String, unique: true, required: true },
    access: { type: String, required: true, default: "user" },
    extra: { type: mongoose.Schema.Types.Mixed },
    createdAt: { type: Date, default: Date.now },
    address: { country: String, city: String, area: String },
    roles_log: { type: Array },
    tag: { type: [] },
    careate_time: { type: Date },
    author: { type: ObjectId },
    roles_val: [],
  });
  // 多加上一个虚拟字段。 查询出来的结果result并不会包含roles的内容，要特别指定出来才会显示result.roles
  RoleSchema.virtual("user", { // "user"要虚拟出来的字段名
    ref: "User", // 要连接的集合（表）
    localField: "roles_val", // Role本地字段
    foreignField: "val", // User集合的字段。连接到user.js中val字段
  });
  return mongoose.model("Role", RoleSchema);
};
