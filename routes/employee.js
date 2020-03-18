module.exports = ({ empRouter }) => {
    empRouter.get('/', (ctx, next) => {
        ctx.body = 'Vaskar Sarma'
    });

    empRouter.post('/add', (ctx, next) => {
        console.log("Employee add");
        console.log(ctx.request.body);
        const empname = (ctx.request.body).empname;
        console.log("empname : " + empname);
        ctx.body = empname;
    });
}