'use strict';

const Controller = require('egg').Controller;

class AdminController extends Controller {
    async index() {
        //egg基于koa
        
        //koa给用户相应信息
        //ctx.body = '用户管理'

        //egg给用户相应信息
        this.ctx.body = '用户管理';
        console.log(this)
    }

}

module.exports = AdminController;

