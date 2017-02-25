var mongoose = require('mongoose');

module.exports = mongoose.model(
  'Novel',
  mongoose.Schema({
    auth: {type: String, default: '空如也'},
    heart: {type: Number, default: 0},
    commentNum: {type: Number, default: 0},
    imgUrl: {type: String},
    type: {type: String},
    tag: {type: Array},
    title: {type: String},
    intro: {type: String},
    content: {type: String},
    dayInfo: {type: String},
    createTime: {type: Date, default: Date.now}
  })
);
