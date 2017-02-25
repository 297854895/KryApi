var Router = require('koa-router');
var frontRouter = require('./front/index.js');
var adminRouter = require('./admin/index.js');
var mainRouter = new Router();

mainRouter.use('/front', frontRouter.routes());
mainRouter.use('/admin', adminRouter.routes());

module.exports = mainRouter;
