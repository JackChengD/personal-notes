'use strict'

const Service = require('egg').Service;

class UserService extends Service {
    async getUserInfo() {
        return {
            name: '张三',
            age: 18
        }
    }
}

module.exports = UserService

