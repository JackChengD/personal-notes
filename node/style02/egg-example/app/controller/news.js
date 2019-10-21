'use strict';

const Controller = require('egg').Controller;


class NewsController extends Controller {
    async index() {
        // this.ctx.body = '新闻页面';
        // let { list, msg } = await this.ctx.service.news.getNewsList()

        //异步的方法
        // await this.ctx.render('news', { msg, list })
        this.ctx.body = '新闻页面'

    }
    async content() {
        //获取get传值
        let query = this.ctx.query
        console.log(query)
        this.ctx.body = '新闻详情';
    }
    async newslist() {
        this.ctx.body = '新闻列表';
        let params = this.ctx.params;
        console.log(params)
    }
}

module.exports = NewsController;
