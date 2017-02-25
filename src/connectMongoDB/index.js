var mongoose = require('mongoose');
// var Article = require('../schema/Article.js');
mongoose.Promise = global.Promise;
mongoose.connect(
  'mongodb://zkc:waa19920626@localhost:27017/kry',
   {
     server: {
       auto_reconnect: true,
       poolSize: 5
     }
   });
function getConnect() {
  mongoose.connect(
    'mongodb://zkc:waa19920626@localhost:27017/kry',
     {
       server: {
         auto_reconnect: true,
         poolSize: 5
       }
     });
}
var db = mongoose.connection;
db.on('error', (err) => {
  if (err) {
    getConnect();
  }
});
module.exports = db;
// db.once('open', function() {
  // we're connected!

  // var addArticle = new Article({ title: 'xx', contxt: 'this is contxt' });
  //
  // addArticle.save(function (err) {
  //   if (err) return console.error(err);
  //   console.log('add Article success');
  // });

  // Article.find(function (err, articles) {
  //   if (err) return console.error(err);
  //   console.log(articles);
  //   db.close();
  // });
  // Article.find({"title": "xx"}).exec(function (err, articles) {
  //   if (err) return console.error(err);
  //   console.log('%s %s is a %s.', articles);
  // });
  // Article.find().limit(1).exec(function(articles){
  //   console.log(articles);
  // });
// });
