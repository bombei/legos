var mongoose = require('mongoose');

var schema = mongoose.Schema;
var PecaSC = new schema({
  codigo:{
    type: Number,
    required: true,
  },
  cor:{
    type: Number,
    required: true,
  },
  tamanho:{
    type: Number,
    required: true,
  }
});

var Peca = mongoose.model('Peca', PecaSC);

module.exports = {Peca};
