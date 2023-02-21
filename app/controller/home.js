'use strict';

const { Controller } = require('egg');

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    // 新增
    let categoryResult = await ctx.model.Categories.create({name:"景点票"});
    console.log("categoryResult===>",categoryResult);
    let categoryId = categoryResult._id;  // _id每个表都会默认生成该值
    let productResult = await ctx.model.Products.create({title:"深圳小梅沙门票",categories:[categoryId]})
    console.log("productResult==>>",productResult)

    /**
     * 查询  findOne根据title字段查询（正则匹配模糊查询）
     * populate引用其他集合的文档
     * --- path: 'person', // 指定路径，即字段名
     * --- match: { age: { $gte: 28 } }, // 对填充文档的过滤条件，和find的过滤规则一致
     * --- select: 'age n -_id', // 指定需要返回的字段，和find的写法一致
     * 指定需要返回的字段，和find的写法一致 返回name字段，不返回 _id  selelct:"name -_id" 可以将_id删除
     */
    let findResult = await ctx.model.Products.findOne({title:"/.*小梅沙.*/"}).populate({path:"categories",selelct:"name -_id"})
    console.log("findResult==>>",findResult)

    // 修改  updateOne 修改一个值，$set插入值。 将匹配到的title修改为set的值
    let updateResult = await ctx.model.Products.updateOne({title:/^深圳/},{$set:{title:"深圳大梅沙门票"}});
    console.log("updateResult==>>",updateResult)
    let findResult1 = await ctx.model.Products.findOne({title:/.*大梅沙.*/});
    console.log("findResult1===>>>",findResult1)

    // 删除  remove删除
    // let removeResult = await ctx.model.Products.remove({title:"深圳大梅沙门票"})
    // console.log("removeResult==>",removeResult)
  }
}

module.exports = HomeController;
