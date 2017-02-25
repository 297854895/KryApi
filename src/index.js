var Koa = require('koa');
var app = new Koa();
var convert = require('koa-convert');
var json = require('koa-json');
var bodyparser = require('koa-bodyparser')();

var mainRouter = require('./router/index.js');
var db = require('./connectMongoDB');
var publishSchema = require('./schema/publishSchema.js');


app.use(convert(bodyparser));
app.use(convert(json()));
app.use(mainRouter.routes(), mainRouter.allowedMethods());
app.listen(3333);
