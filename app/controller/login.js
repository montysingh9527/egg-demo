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
        sort: {"_id": -1}
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




}

module.exports = loginController;
