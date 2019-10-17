/*
    options:中间件的配置项，框架会将config[$(middlewareName)]传递进来
    app:当前应用Application的实例

    配置中间件
*/

module.exports = (options, app) => {
    console.log(options, app)
    return async function printDate(ctx, next) {
        await next()
    }
}