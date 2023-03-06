'use strict';

/**
 * 首页相关路由
 */
module.exports = app => {
  const { router, controller } = app;
  const jwt = app.middleware.jwt({ app });
  // 单路由插入jwt验证
  router.post('/home',jwt, controller.home.index);
};
