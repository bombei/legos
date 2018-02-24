var mongoose = require('mongoose');

var schema = mongoose.Schema;
var PecaSC = new schema({
  codigo:{
    type: Number,
    required: true,
    unique: true,
  },
  otherCode:{
    type: String,
  },
  cor:{
    type: Number,
    required: true,
    default: 0,
  },
  liso:{
    type: Number,
    required: true,
    default: 0,
  },
  tamanho:{
    type: Number,
    required: true,
    default: 0,
  },
  altura:{
    type: Number,
    required: true,
    default: 0,
  },
  imagem:{
    type: String,
  }
});

var Peca = mongoose.model('Peca', PecaSC);

module.exports = {Peca};
