//外部可以通过this.app.foo()调用该方法

module.exports = {
    getUrl() {
        return this.config.url
    }
}