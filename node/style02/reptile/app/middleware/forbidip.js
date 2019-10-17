/*
    options:中间件的配置项，框架会将config[$(middlewareName)]传递进来
    app:当前应用Application的实例

    配置中间件
*/

module.exports = (options, app) => {
    return async function forbidIo(ctx, next) {
        var forbidip = options.forbidip;
        var client = ctx.request.ip;
        if (forbidip.some(item => item == client)) {
            ctx.status = 403;
            ctx.message = 'your ip is forbidden'
        } else {
            await next()
        }
    }
}













// module.exports = (options, app) => {
//     return async function forbidIo(ctx, next) {
//         var forbidip = '127.0.0.1';
//         if (ctx.request.ip == forbidip) {
//             ctx.status = 403;
//             ctx.message = 'your ip is forbidden'
//         } else {
//             await next()
//         }
//     }
// }