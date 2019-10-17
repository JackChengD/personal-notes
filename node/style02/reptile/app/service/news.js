'use strict';

const Service = require('egg').Service;

class NewsService extends Service {
    async getNewsList() {
        //通过抓取接口返回数据
        //curl的方法可以获取远程的数据
        let api = this.app.getUrl() + 'appapi.php?a=getPortalList&catid=20&page=1'
        let response = await this.ctx.curl(api)
        // console.log(response.data);//buffer类型
        var data = JSON.parse(response.data)
        return data.result
    }
    async getNewsContent(aid) {
        //通过抓取接口返回数据
        //curl的方法可以获取远程的数据
        let api = this.app.getUrl() + 'appapi.php?a=getPortalArticle&aid=' + aid
        let response = await this.ctx.curl(api)
        // console.log(response.data);//buffer类型
        var data = JSON.parse(response.data)
        return data.result
    }
}

module.exports = NewsService;
