var mongoose = require('mongoose');

var schema = mongoose.Schema;
var KitSc = new schema({
  codigo:{
    type: Number,
    required: true,
  },
  imagem:{
    type: String,
  },
  completed:{
    type: Boolean,
    default: false
  }
});

var Kit = mongoose.model('Kit', KitSc);

module.exports = {Kit};
