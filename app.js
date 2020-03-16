const Koa = require('koa');
const app = new Koa();
/*
app.use(async ctx=>{ctx.body = 'Hello World'});
app.listen(3000, () => {
    console.log(`Server started on port 3000`);
});
*/

const Router = require('koa-router');

const router = new Router();

const logger = require('koa-logger');

router.get('/', (ctx, next) => {
    ctx.body = "Hello Vaskar Sarma!";
});

app.use(async (ctx, next) => {
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

const server = app.listen(3000, () => {
    console.log(`Server started on port 3000`);
});

module.exports = server;