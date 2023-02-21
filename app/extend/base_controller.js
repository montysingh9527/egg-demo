const { Controller } = require("egg");
// 处理请求
class BaseController extends Controller {
  async go(promise) {
    return promise.then((data) => {
        return [true, "成功", data];
      }).catch((err) => {
        return [false, err.message || "失败", err];
      });
  }
}

module.exports = BaseController;
