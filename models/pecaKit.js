var mongoose = require('mongoose');

var schema = mongoose.Schema;
var PecaKitSc = new schema({
  id_Peca:{
    type: String,
    required: true,
  },
  id_Kit:{
    type: String,
    required: true,
  },
  quantidade:{
    type: Number,
    default: 0,
  },
  encontradas:{
    type: Number,
    default: 0,
  },
});

var PecaKit = mongoose.model('PecaKit', PecaKitSc);

module.exports = {PecaKit};
