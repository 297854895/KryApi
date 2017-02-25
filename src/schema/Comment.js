var mongoose = require('mongoose');
module.exports = mongoose.model(
  'Comment',
  mongoose.Schema({
    auth: {type: String},
    authPic: {type: String, default: '/static/img/userdefault.png'},
    content: {type: String},
    articleId: {type: String},
    relpyNum: {type: Number, default: 0},
    thumbNum: {type: Number, default: 0},
    createTime: {type: Date, default: Date.now}
  })
);
