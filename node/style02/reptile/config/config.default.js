/* eslint valid-jsdoc: "off" */

'use strict';

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
  config.keys = appInfo.name + '_1571039580628_414';

  // add your middleware config here
  config.middleware = ['printdate', 'forbidip'];
  config.printdate = {
    a: '132321 '
  }
  config.forbidip = {
    forbidip: ['127.0.0.1', '192.168.10.201']
  }

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  config.view = {
    mapping: {
      '.html': 'ejs'
    }
  };
  config.url = 'http://www.phonegap100.com/'

  return {
    ...config,
    ...userConfig,
  };
};
