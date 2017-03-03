var Router = require('koa-router');
var adminRouter = new Router();
var db = require('../../connectMongoDB');

adminRouter
.post(
  '/article',
  async (ctx, next) => {
    if (ctx.request.body) {
      console.log('get', ctx.request.body);
      await db.model('Article').create(ctx.request.body, (err) => {
        if (err) {
          //储存失败
          ctx.status = 500;
          console.log(err);
          return;
        };
        console.log('ok');
        //存储成功
        ctx.status = 200;
      });
      return;
    }
    ctx.status = 204;
  }
)
.get(
  '/article',
  async (ctx, next) => {
    const query = ctx.query;
    let result;
    switch (query.type) {
      case 'list':
        const filterKey = query.filterKey === 'All' ? {} : {"type" : query.filterKey};
        if (query.searchTitle) {
          filterKey.title = new RegExp(query.searchTitle);
        }
        const total = await db.model('Article')
        .count(filterKey)
        .exec((err, total) => {
          if (err) return console.error(err);
          return total;
        });
        const data = await db.model('Article')
        .find(filterKey)
        .sort({ 'createTime': 'desc' })
        .limit(query.size)
        .skip((query.index - 1) * query.size)
        .select({'_id': true, 'title': true, 'type': true, 'auth': true, 'createTime': true})
        .exec((err, articles) => {
          if (err) return console.error(err);
          return articles;
        })
        result = {total, data, index: parseInt(query.index), size: parseInt(query.size)};
        break;
      default:
        result = '';
    }
    if (!result) {
      ctx.status = 500;
      return;
    }
    ctx.body = result;
  }
)
.delete(
  '/article',
  async (ctx, next) => {
    if (ctx.query._id) {
      await db.model('Article')
            .remove({"_id": ctx.query._id})
            .exec((err, result) => {
              if(err) return console.error();
              ctx.body = 'success';
            })
      return;
    }
    ctx.status = 500;
  }
);

module.exports = adminRouter;
