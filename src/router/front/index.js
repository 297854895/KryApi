var Router = require('koa-router');
var frontRouter = new Router();
var Article = require('../../schema/Article.js');

frontRouter
.get(
  '/comment',
  (ctx, next) => {
    async function test () {
       Article.find({"title": "xx"})
      .exec((err, articles) => {
        if (err) return console.error(err);
        // this.body = articles;
        // ctx.res.send(articles);
        console.log('1111');
      }).catch(err => {
        console.log(err);
      });
    }
    await test();
    console.log('2222');
    ctx.body = [1,3,4,5,6];
  }
);

module.exports = frontRouter;
