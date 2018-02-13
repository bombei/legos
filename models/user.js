const mongoose = require('mongoose');
const validator = require('validator');

var User = mongoose.model('User',{
    email: {
      type: String,
      requires: true,
      trim: true,
      minlength: 1,
      unique: true,
      validate: {
        validator: validator.isEmail,
        message: 'Não é um mail válido!',
      },
    },
    password: {
        type: String,
        requires: true,
        minlength: 1,
    },
    tokens: [{
        access: {
            type: String,
            requires: true,
        },
        token: {
            type: String,
            requires: true,
        }
    }]
});

module.exports = {User};
