//外部可以通过this.ctx.getHost()调用该方法

var sd = require('silly-datetime')
module.exports = {
    formatTime(param) {
        return sd.format(new Date(param * 1000), 'YYYY-MM-DD HH:mm');
    }
}