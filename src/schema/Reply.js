var mongoose = require('mongoose');

module.exports = mongoose.model(
  'Reply',
  mongoose.Schema({
    auth: {type: String},
    content: {type: String},
    commentId: {type: String},
    createTime: {type: Date, default: Date.now}
  })
);
