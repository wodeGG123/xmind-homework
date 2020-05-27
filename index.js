// 导入koa，和koa 1.x不同，在koa2中，我们导入的是一个class，因此用大写的Koa表示:
const Koa = require('koa2');
// 注意require('koa-router')返回的是函数:
const router = require('koa-router')();
// 创建一个Koa对象表示web app本身:
const app = new Koa();

// 对于任何请求，app将调用该异步函数处理请求：
app.use(async (ctx, next) => {
    await next();
});

// add url-route:
router.get('/get/:csv', async (ctx, next) => {
    var csvName = ctx.params.csv;
    var csv = require(__dirname+'/src/utils/csv.js');
    try {
        var res = await csv.getCsv(__dirname+'/resources/' + csvName + '.csv')
        ctx.response.body = res;
    } catch (error) {
        ctx.response.body = error;
    }
    next()
   
});
// add router middleware:
app.use(router.routes());
// 在端口3000监听:
app.listen(3000);
console.log('app started at port 3000...');


