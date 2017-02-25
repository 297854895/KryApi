var Router = require('koa-router');
var adminRouter = new Router();
var db = require('../../connectMongoDB');

adminRouter
.post(
  '/article',
  async (ctx, next) => {
    // ctx.body = await db.model('Article').find({"title": "xx"})
    // .exec((err, articles) => {
    //   if (err) return console.error(err);
    //   return articles;
    // });

    // var Article = db.model('Article');
    // var addArticle = new Article({
    //   "imgUrl": "www.baidu.com",
    //   "type": "word",
    //   "title": "This is Title",
    //   "contxt": "This is content"
    // });
    // await addArticle.save(function (err, ctx) {
    //   if (err) return console.error(err);
    //   console.log('success');
    // });
    if (ctx.request.body) {
      await db.model('Article').create(ctx.request.body, (err) => {
        if (err) {
          //储存失败
          ctx.status = 500;
          return;
        };
        //存储成功
        ctx.status = 200;
      });
      return;
    }
    ctx.status = 204;
  }
)
.post(
  '/comment',
  async (ctx, next) => {
    console.log('this is post comment');
  }
)
.post(
  '/reply',
  async (ctx, next) => {
    console.log('this is post reply');
  }
);

module.exports = adminRouter;
