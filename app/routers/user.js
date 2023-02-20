'use strict';

/**
 * 用户相关路由
 */
module.exports = app => {
  const { router, controller } = app;
  router.post('/create', controller.user.create);
};
