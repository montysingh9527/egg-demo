const { Controller } = require("egg");
const ms = require("ms");

class loginController extends Controller {
  /**
   * 登录
   * @returns
   */
  async login() {
    const { ctx } = this;
    let { username = "", password, rememberMe = "" } = ctx.request.body;
    if (!username) return (ctx.body = [false, "用户名不能为空", username]);
    if (!password) return (ctx.body = [false, "密码不能为空", password]);
    const [status, msg, result] = await ctx.model.Users.findOne({username, password});
    if (!status) return (ctx.body = [false, "用户名或密码不正确", result]);
    if (result._id && result.username) {
      ctx.session.user = {
        userid: result._id,
        username: result.username,
        rolesVal: result.roles_val,
      };
      // 设置session过期时间
      if (rememberMe) ctx.session.maxAge = ms("30d");
    }
    ctx.body = [ status, "登录成功", result];
  };

/**
 * 返回分页数据
 * @returns 
 */
  async list(){
    const { ctx } = this;
    let { current = 1, size = 10, title,tag,citiesVal} = ctx.request.body;
    let findParams = {};
    if(title) findParams.title = title;
    if(tag) findParams.tag = tag;
    if(citiesVal)findParams.cities_val = citiesVal.split(",");
    let [ status, msg, count] = await ctx.model.Products.find(findParams).countDocuments();
    if(!status) return ctx.body = [ status, msg, count];
    const pagesParams = {
        skip: Number((current - 1)*size),
        limit: Number(size),
        sort: {"_id": -1},  // 默认返回的数据按照创建时间排序，-1为逆序，1为顺序
    }
    let result;
    [status, msg, result] = await ctx.model.Products.find(findParams,{},pagesParams).populate("roles")
    ctx.body = [status ,msg, {
        result: result.map(itemm=>({
            ...itemm.toObject(),
            cities: itemm.roles.map(x=>({name: x.name, val: x.val}))
        }))
    }]

  }

  // jwt
  async jwtlogin() {
    const { ctx, app } = this;
    const { email, password } = ctx.request.body;
    // 查询用户是否存在
    // 先查用户名是否存在
    // 再查密码是否正确
    const user = await ctx.model.User.findOne({
      email,
      password: md5(password + 'ruixue@0702'),
    });
    if (user) {
      // 生成 token 返回
      const { nickname } = user;
      const token = app.jwt.sign({
        nickname,
        email,
        id: user._id,
      }, app.config.jwt.secret, {
        expiresIn: '24h',
      });
      this.success({ token, email });
    } else {
      this.error('用户名或者密码错误');
    }
  }


}

module.exports = loginController;
