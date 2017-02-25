var mongoose = require('mongoose');

module.exports = mongoose.model(
  'Comment',
  mongoose.Schema({
    auth: {type: String},
    contxt: {type: String},
    cid: {type: String},
    createTime: {type: Date, default: Date.now}
  });
);
