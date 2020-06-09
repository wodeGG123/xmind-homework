
let path =  require('path');
let response = require("./response");
module.exports = (router)=>{
    let csv = require(path.resolve(__dirname,'../../src/utils/csv.js'));
    // 获取账单列表
    router.get('/api/csv/:filename', async (ctx, next) => {
        let csvName = ctx.params.filename;
        try {
            var res = await csv.get(path.resolve(__dirname,'../../db/' + csvName + '.csv') , ctx);
            ctx.response.body = response.success(res);
        } catch (error) {
            ctx.response.body = response.error(error);
        }
        next()
    });
    // 删除某条账单
    router.del('/api/csv/:filename', async (ctx, next) => {
        let csvName = ctx.params.filename;
        
        try {
            var res = await csv.del(path.resolve(__dirname,'../../db/' + csvName + '.csv'), ctx);
             ctx.response.body = response.success(res);
        } catch (error) {
             ctx.response.body = response.error(error);
        }
        next()
    });
    // 修改某条账单
    router.put('/api/csv/:filename', async (ctx, next) => {
        let csvName = ctx.params.filename;
        try {
            var res = await csv.update(path.resolve(__dirname,'../../db/' + csvName + '.csv'), ctx);
             ctx.response.body = response.success(res);
        } catch (error) {
             ctx.response.body = response.error(error);
        }
        next()
    });
    // 新增账单
    router.post('/api/csv/:filename', async (ctx, next) => {
        let csvName = ctx.params.filename;
        try {
            var res = await csv.add(path.resolve(__dirname,'../../db/' + csvName + '.csv'), ctx);
             ctx.response.body = response.success(res);
        } catch (error) {
             ctx.response.body = response.error(error);
        }
        next()
    });
}