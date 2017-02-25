var Router = require('koa-router');
var frontRouter = new Router();
var db = require('../../connectMongoDB');

frontRouter
.get(
  '/comment',
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
    db.model('Article').create({
      "imgUrl": "www.baidu.com",
      "type": "word",
      "title": "This is Title",
      "contxt": "This is content"
    }, (err) => {
      if (err) return console.error(err);
      console.log('success');
    });
  }
);

module.exports = frontRouter;
