/* eslint valid-jsdoc: "off" */

'use strict';
const path = require('path');
/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1676901387616_7332';

  // 加载 auth 中间件
  // config.middleware = ['auth', "error_handler"];
  // 静态文件路径配置
  config.static = {
    prefix: '/public/',
    dir: path.join(appInfo.baseDir, 'public')
  };
  // config.jwt = {
  //   secret: 'Great4-M',
  //   enable: true, // default is false
  //   match: '/jwt', // optional
  // }

  return config;
};
