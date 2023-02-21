'use strict';

/**
 * 首页相关路由
 */
module.exports = app => {
  const { router, controller } = app;
  router.post('/home', controller.home.index);
};
