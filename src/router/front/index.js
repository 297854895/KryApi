var Router = require('koa-router');
var frontRouter = new Router();

frontRouter
.get(
  '/comment',
  (ctx, next) => {
    console.log(1);
    next();
    console.log(3);
    ctx.body = [1,2,3,4];
  },
  (ctx, next) => {
    console.log(2);
  }
);

module.exports = frontRouter;
