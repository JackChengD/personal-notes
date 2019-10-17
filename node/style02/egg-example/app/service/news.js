'use strict';

const Service = require('egg').Service;


class NewsService extends Service {
    async getNewsList() {
        //获取新闻数据
        let list = [11, 22, 1];
        let msg = 'ejs';
        let user = this.ctx.service.user.getUserInfo()

        return { list, msg, user }

    }

}

module.exports = NewsService;
