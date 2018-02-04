var mongoose = require('mongoose');

var Peca = mongoose.model('Peca', {
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
