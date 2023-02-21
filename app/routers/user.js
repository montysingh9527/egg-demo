'use strict';

/**
 * 用户相关路由
 */
module.exports = app => {
  const { router, controller } = app;
  const adminPrefix = "/v1/admin";
  const user = "/user";   // 用户模块
  router.post(adminPrefix + user + '/create', controller.user.create);
};
