const Koa = require('koa');
const app = new Koa();
/*
app.use(async ctx=>{ctx.body = 'Hello World'});
app.listen(3000, () => {
    console.log(`Server started on port 3000`);
});
*/

const bodyparser = require('koa-body');
app.use(bodyparser());
// app.use(ctx => {
//     ctx.body = JSON.stringify(ctx.request.body);
// });

const Router = require('koa-router');

const router = new Router();
const dogRouter = new Router({
    prefix: '/dogs'
});
const empRouter = new Router({
    prefix: '/employee'
});

require('./routes/basic')({ router })
require('./routes/dogs')({ dogRouter });
require('./routes/employee')({ empRouter });

const logger = require('koa-logger');

/*
router.get('/', (ctx, next) => {
    console.log(ctx);
    ctx.body=ctx;
});
*/

app.use(async(ctx, next) => {
    try {
        await next();
    } catch (err) {
        ctx.status = err.status || 500;
        ctx.body = err.message;
        ctx.app.emit('error', err, ctx);
    }
})

app.use(logger());

app.use(router.routes());
app.use(router.allowedMethods());

app.use(dogRouter.routes());
app.use(dogRouter.allowedMethods());

app.use(empRouter.routes());
app.use(empRouter.allowedMethods());

const server = app.listen(3000, () => {
    console.log(`Server started on port 3000`);
});

module.exports = server;