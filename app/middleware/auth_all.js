/*
 * 登录权限验证
 */

const url = require('url');

module.exports = () => {
    return async function authAll(ctx, next) {
        // 1. 判断是否登录
        // 2. 登录了：进入next()
        // 3. 没登录：判断请求地址是否在白名单内，在： 忽略， 不在： 跳转到登录页
        const pathname = url.parse(ctx.request.url).pathname;
        const whiteList = [ '/captcha', 'login', 'register' ];
        const user = ctx.cookies.get('userinfo');
        if (!user && !whiteList.includes(pathname)) { // 没登录且没在白名单内
            ctx.redirect('/login');
            return;
        }
        await next();
    };
};