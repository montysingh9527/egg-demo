/**
 * 禁止ip访问
 * @param {*} options 
 * @param {*} app 
 * @returns 
 */
module.exports = (options, app)=>{
    // 返回一个异步的方法
    return async function forbidIp(ctx, next){
        // 要屏蔽的ip：1、从数据库获取。 2、从参数传入
        // 要屏蔽的ip
        const forbidip = "127.0.0.1";
        // 获取客户端ip  ctx.request.ip
        if(ctx.request.ip == forbidip){
            // ctx.status = 403;
            ctx.message = "您的ip已经被屏蔽";
        }else{
            await next();
        }
    }
}