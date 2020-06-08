// 导入koa，和koa 1.x不同，在koa2中，我们导入的是一个class，因此用大写的Koa表示:
const Koa = require('koa2');
// 注意require('koa-router')返回的是函数:
const router = require('./src/api/index');
// body中间件
const bodyParser = require('koa-bodyparser');
// 创建一个Koa对象表示web app本身:
const app = new Koa();

app.use(bodyParser());
// 对于任何请求，app将调用该异步函数处理请求：
app.use(async (ctx, next) => {
    await next();
});

// add router middleware:
app.use(router.routes());
// 在端口3000监听:
app.listen(3000);
console.log('app started at port 3000...');
