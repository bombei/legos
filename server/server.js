var express = require('express');
var bodyParser = require('body-parser');

var {mongoose} = require('./../db/mongoose.js');
var {Peca} = require('./../models/peca.js');
var {ObjectID} = require('mongodb');

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
   Peca.find().then((pecas) =>{
      res.status(200).send({pecas});
   }, (e) => {
      res.status(400).send(e);
   })
});

app.get('/peca/:id', (req, res) => {
   var id = req.params.id;
   if (!ObjectID.isValid(id)){
      return res.status(404).send();
   }

   Peca.findById(id).then((peca) => {
      if(!peca){
         return res.status(404).send();
      }
      res.send({peca});
   }).catch((e) => {
      res.status(400).send(e);
   })

}, (e) => {

})

 app.listen(port, () => {
   console.log(`Server running on port ${port}`);
 });
