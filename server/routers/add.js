const { findMany } = require("../utils/connect");

module.exports = {
  path: "/servers/addapi",
  async handle(ctx, next) {
    let params = ctx.request.body;
    console.log(params);
    let res = await findMany("user", {});
    console.log(res);
    ctx.body = { res: "SUCCESS", data: res, code: 2000 };
  }
};
