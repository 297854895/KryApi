var mongoose = require('mongoose');
module.exports = mongoose.model(
  'Comment',
  mongoose.Schema({
    auth: {type: String},
    authPic: {type: Number, default: 1},
    content: {type: String},
    aid: {type: String},
    relpyNum: {type: Number, default: 0},
    thumbNum: {type: Number, default: 0},
    createTime: {type: Date, default: Date.now}
  })
);
