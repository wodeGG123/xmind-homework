// 导入koa，和koa 1.x不同，在koa2中，我们导入的是一个class，因此用大写的Koa表示:
const Koa = require('koa2');
// 注意require('koa-router')返回的是函数:
const router = require('./src/api/index');
// body中间件
const bodyParser = require('koa-bodyparser');

const views =  require('koa-views');
const path = require('path');
const staticResource = require('koa-static');

// 创建一个Koa对象表示web app本身:
const app = new Koa();
// 设置静态资源地址
app.use(staticResource(__dirname + '/public',{
    'maxage':30*24*60*60*1000,
}));
// 加载模板引擎
app.use(views(path.join(__dirname, './views'), {
    extension: 'html'
}))
// app.use( async ( ctx ) => {
//     await ctx.render('index')
// })
app.use(bodyParser());
// 对于任何请求，app将调用该异步函数处理请求：
app.use(async (ctx, next) => {
    await next();
});

// add router middleware:
app.use(router.routes());



// 在端口3000监听:
app.listen(80);
console.log('app started at port 80...');
