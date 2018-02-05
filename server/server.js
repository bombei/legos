var express = require('express');
var bodyParser = require('body-parser');

var {mongoose} = require('./../db/mongoose.js');
var {Peca} = require('./../models/peca.js');

const port = process.env.PORT || 3000;
var app = express();

app.use(bodyParser.json());

app.post('/peca', (req, res) => {
   var peca = new Peca({
      codigo:req.body.codigo,
      cor:req.body.cor,
      tamanho:req.body.tamanho,
   });

   peca.save().then((doc) => {
      res.status(200).send(doc);
   }, (e) => {
      res.status(400).send(e);
   });
});

app.get('/peca', (req, res) => {
   peca.find().then((pecas) =>{
      res.status(200).send({pecas});
   }, (e) => {
      res.status(400).send(e);
   })
});
 app.listen(port, () => {
   console.log(`Server running on port ${port}`);
 });
