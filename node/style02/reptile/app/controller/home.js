'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    // this.ctx.body = '首页';
    // console.log(this.ctx.getHost())
    // console.log(this.app.getUrl())
    await this.ctx.render('index')
  }
}

module.exports = HomeController;
