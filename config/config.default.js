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

  config.mongoose = {
    url: 'mongodb://127.0.0.1:27017/egg_demo',
    options: {
      // useMongoClient: true,
      // autoReconnect: true,
      // reconnectTries: Number.MAX_VALUE,
      // bufferMaxEntries: 0,
    },
  }

  // 加载 auth 中间件 配置中间件auth为middleware目录下的文件名。 中间件会在每次路由变化时执行
  // config.middleware = ['auth', "error_handler"，"forbidIp"];
  // 给auth中间件传入的options参数
  // config.auth = {
  //   aaa:"aaaa"
  // }


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

  // 去除csrf
  config.security = {
    csrf: {
      enable: false
    }
  }

  return config;
};
