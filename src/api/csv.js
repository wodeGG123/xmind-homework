
let path =  require('path');
let response = require("./response");
module.exports = (router)=>{
    let csv = require(path.resolve(__dirname,'../../src/utils/csv.js'));
    // add url-route:
    router.get('/csv/:filename', async (ctx, next) => {
        let csvName = ctx.params.filename;
        try {
            var res = await csv.get(path.resolve(__dirname,'../../resources/' + csvName + '.csv') , ctx);
            ctx.response.body = response.success(res);
        } catch (error) {
            ctx.response.body = response.error(error);
        }
        next()
    });
    router.del('/csv/:filename', async (ctx, next) => {
        let csvName = ctx.params.filename;
        
        try {
            var res = await csv.del(path.resolve(__dirname,'../../resources/' + csvName + '.csv'), ctx);
             ctx.response.body = response.success(res);
        } catch (error) {
             ctx.response.body = response.error(error);
        }
        next()
    });
    router.put('/csv/:filename', async (ctx, next) => {
        let csvName = ctx.params.filename;
        try {
            var res = await csv.update(path.resolve(__dirname,'../../resources/' + csvName + '.csv'), ctx);
             ctx.response.body = response.success(res);
        } catch (error) {
             ctx.response.body = response.error(error);
        }
        next()
    });
    router.post('/csv/:filename', async (ctx, next) => {
        let csvName = ctx.params.filename;
        try {
            var res = await csv.add(path.resolve(__dirname,'../../resources/' + csvName + '.csv'), ctx);
             ctx.response.body = response.success(res);
        } catch (error) {
             ctx.response.body = response.error(error);
        }
        next()
    });
}