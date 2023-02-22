module.exports = {
    schedule:{
        // 参考： https://www.eggjs.org/zh-CN/basics/schedule
        // interval: 1s, // 1分钟间隔
        interval: 2000,  
        type: "all",  // 指定所有的worker都需要执行
    },
    async task(ctx){
        console.log("定时任务=>>")
    }
}