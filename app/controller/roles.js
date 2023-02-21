const BaseController = require("../extend/base_controller");

class RolesController extends BaseController {
    // 创建
    async create(){
        const { ctx } = this;
        const { body } = ctx.request;
        const result =  await this.go(this.model.Roles.create(body))
        ctx.body = result;
    }
    // 查询
    async list(){
        const { name, val} = this.ctx.request.body;
        let findData = {};
        if(name){
            // 模糊匹配
            findData.name = RegExp(".*" + name + ".*");
        }
        if(val){
            findData.val = val;
        }
        const result = await this.go(this.ctx.model.Roles.find(findData));
        this.ctx.body = result;
    }
    // 修改
    async update(){
        const { _id, name, val} = this.ctx.request.body;
        let updateData = {};
        if(name){
            updateData.name = name;
        }
        if(val){
            updateData.val = val;
        }
        const result = await this.go(this.ctx.model.Roles.update({_id}, {$set: updateData}));
        this.ctx.body = result;
    }
    // 根据id查询
    async findOne(){
        const { _id } = this.ctx.params;
        const result = await this.go(this.ctx.model.Roles.findOne({_id}));
        this.ctx.body = result;
    }
    // 删除
    async remove(){
        const { _id } = this.ctx.request.body;
        const result = await this.go(this.ctx.model.Roles.remove({_id}));
        this.ctx.body = result;
    }
}
module.exports = RolesController;