let Router = require("koa-router");
let routers = require("./routers/index.js");

let router = new Router();

routers.forEach(r => {
  router.all(r.path, r.handle)
});

module.exports = router;
