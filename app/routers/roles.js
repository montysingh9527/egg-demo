'use strict';

/**
 * 管理员相关路由
 */
module.exports = app => {
  const { router, controller } = app;
  router.post('/create', controller.roles.create);
  router.post('/list', controller.roles.list);
  router.post('/update', controller.roles.update);
  // find_one/321
  router.get('/find_one/:_id', controller.roles.findOne);
  router.post('/remove', controller.roles.remove);
};
