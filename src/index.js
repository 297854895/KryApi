var Koa = require('koa');
var app = new Koa();
var mainRouter = require('./router/index.js');
var db = require('./connectMongoDB');

app.use(mainRouter.routes(), mainRouter.allowedMethods());
app.listen(3333);
