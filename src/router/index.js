var Router = require('koa-router');
var frontRouter = require('./front/index.js');

var mainRouter = new Router();

mainRouter.use('/front', frontRouter.routes());
module.exports = mainRouter;
