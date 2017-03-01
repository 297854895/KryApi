var Router = require('koa-router');
var frontRouter = new Router();
var db = require('../../connectMongoDB');

frontRouter
.get(
  '/article',
  async (ctx, next) => {
    const query = ctx.query;
    let result;
    switch (query.type) {
      case 'list':
        const filterKey = query.filterKey === 'All' || !query.filterKey ? {} : {"type" : query.filterKey};
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
                      .select({'_id': true, 'title': true, 'type': true, 'auth': true, 'createTime': true, dayInfo: true, heart: true, commentNum: true, imgUrl: true, tag: true, intro: true})
                      .exec((err, articles) => {
                        if (err) return console.error(err);
                        return articles;
                      });
        result = {total, data, index: parseInt(query.index), size: parseInt(query.size)};
        break;
      case 'details':
        const articlesData = await db.model('Article')
          .findOne({"_id": query._id})
          .exec((err, data) => {
            if (err) return console.error(err);
            return data;
          });
        result = articlesData;
        break;
      case 'recommend':
        const recommend = await db.model('Article')
                          .find({})
                          .sort({'heart': 'desc' })
                          .limit(8)
                          .select({'_id': true, 'title': true, 'type': true, heart: true, commentNum: true})
                          .exec((err, data) => {
                            if (err) return console.error(err);
                            return data;
                          });
        result = recommend;
        break;
      case 'type':
        const webArticle = await db.model('Article')
                            .find({"type": "web"})
                            .sort({ 'createTime': 'desc' })
                            .limit(9)
                            .select({'_id': true, 'title': true, 'type': true, heart: true, commentNum: true})
                            .exec((err, data) => {
                              if (err) return console.error(err);
                              return data;
                            });
        const wordArticle = await db.model('Article')
                            .find({"type": "word"})
                            .sort({ 'createTime': 'desc' })
                            .limit(9)
                            .select({'_id': true, 'title': true, 'type': true, heart: true, commentNum: true})
                            .exec((err, data) => {
                              if (err) return console.error(err);
                              return data;
                            });
        result = {web: webArticle, word: wordArticle};
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
.get(
  '/comment',
  async (ctx, next) => {
    const _id = ctx.query._id;
    if (!_id) {
      ctx.status = 500;
      return;
    }
    const filterKey = ctx.query.filterKey;
    let filterObj;
    if (filterKey === 'new' || !filterKey) {
      filterObj = {'createTime': 'desc'};
    } else {
      filterObj = {'thumbNum': 'desc'};
    }
    const total = await db.model('Comment')
                  .count({"aid": _id})
                  .exec((err, total) => {
                    if (err) return console.error(err);
                    return total;
                  });
    const comment = await db.model('Comment')
                      .find({"aid": _id})
                      .sort(filterObj)
                      .limit(ctx.query.size)
                      .skip((ctx.query.index - 1) * ctx.query.size)
                      .select({'auth': true, 'authPic': true, 'content': true, "createTime": true, relpyNum: true, thumbNum: true, "_id": true, "aid": true})
                      .exec((err, data) => {
                        if (err) return console.error(err);
                        return data;
                      });
    ctx.body = {data: comment, total: total, index: parseInt(ctx.query.index), size: parseInt(ctx.query.size)};
  }
)
.get(
  '/reply',
  async (ctx, next) => {
    console.log('this is get reply');
  }
)
.post(
  '/comment',
  async (ctx, next) => {
    if (ctx.request.body) {
      await db.model('Comment').create(ctx.request.body, (err) => {
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
  '/reply',
  async (ctx, next) => {
    console.log('this is post reply');
  }
);

module.exports = frontRouter;
