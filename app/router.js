'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  // 导入user下的路由
  require("./routers/user")(app);
  /**
   * 方式一：路径导入 controller文件路径   v1文件路径  users文件路径   create方法
   * const { router, controller } = app;
   * router.post('/api/v1/users', controller.v1.users.create);
   */

  /**
   * 方式二（推荐）：分模块建路由  导入router目录下web.js的相关的路由 
   * 参考： https://www.eggjs.org/zh-CN/basics/router#%E5%A4%AA%E5%A4%9A%E8%B7%AF%E7%94%B1%E6%98%A0%E5%B0%84
   * require('./router/web')(app);
   * const { router, controller, config, middleware } = app;
   * const { sign, user, message } = controller;
   * const createUserLimit = middleware.createUserLimit(config.create_user_per_ip);
   *  // sign controller
   * if (config.allow_sign_up) {
   *   // 跳转到注册页面
   *   router.get('/signup', sign.showSignup);
   *   // 提交注册信息
   *   router.post('/signup', createUserLimit, sign.signup);
   * } else {
   *   // 进行github验证  redirect重定向
   *   router.redirect('/signup', '/passport/github');
   * }
   */
};
