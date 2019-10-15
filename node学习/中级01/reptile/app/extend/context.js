//外部可以通过this.ctx.getHost()调用该方法

module.exports = {
    getHost(param) {
        return this.request.host
    }
}