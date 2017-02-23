var mongoose = require('mongoose');

module.exports = mongoose.model(
  'Article',
  mongoose.Schema({
    title: {type: String},
    contxt: {type: String},
    createTime: {type: Date, default: Date.now}
  })
);
