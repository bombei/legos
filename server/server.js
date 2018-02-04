var express = require('express');
var bodyParser = require('body-parser');

var {mongoose} = require('./../db/mongoose.js');
var {Peca} = require('./../models/peca.js');

const port = process.env.PORT || 3000;
var app = express();

app.use(bodyParser.json());

app.post('/peca', (req, res) => {
   console.log(req.body);
});

 app.listen(port, () => {
   console.log(`Server running on port ${port}`);
 });
