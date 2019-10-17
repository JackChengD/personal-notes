'use strict';

const Controller = require('egg').Controller;


class HomeController extends Controller {
  async index() {
    //调用服务的方法
    let { list, msg, user } = await this.service.news.getNewsList();
    await this.ctx.render('news', {
      list, msg, user
    })
  }

}

module.exports = HomeController;
