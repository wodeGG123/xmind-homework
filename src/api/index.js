const router = require('koa-router')();
const csv = require('./csv')
csv(router)
router.get('/', async (ctx, next) => {
    await ctx.render('index')
});
module.exports = router