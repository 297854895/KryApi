var mongoose = require('mongoose');

module.exports = mongoose.model(
  'Article',
  mongoose.Schema({
    auth: {type: String, default: '空如也'},
    heart: {type: Number, default: 0},
    commentNum: {type: Number, default: 0},
    imgUrl: {type: String},
    type: {type: String},
    title: {type: String},
    contxt: {type: String},
    createTime: {type: Date, default: Date.now}
  })
);
