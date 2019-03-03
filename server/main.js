const Koa = require('koa');
const koaBody = require('koa-body');
const static = require('koa-static');
const cors = require('koa-cors');

const router = require('./router.js');

const app = new Koa();

app.use(koaBody({ multipart: true }));

// 设置跨域 用不用插件都可
app.use(async (ctx, next) => {
  ctx.set('Access-Control-Allow-Origin', '*');
  return next();
});
// app.use(cors())

app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    ctx.response.status = err.statusCode || err.status || 500;
    ctx.response.type = 'html';
    ctx.response.body = '<p>Something wrong, please contact administrator.</p>';
    ctx.app.emit('error', err, ctx);
  }
});

app.use(router.routes());

// app.use(static(path.join(__dirname)))

app.on('error', ({ message } = {}) => void console.log(`[ERROR]: ${message}`));


// 监听3001端口
const port = 9600;
app.listen(port, () => {
  console.log(`server run on http://127.0.0.1:${port}`);
});