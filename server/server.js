var express = require('express');
var bodyParser = require('body-parser');
var _ = require('lodash');

var {mongoose} = require('./../db/mongoose.js');
var {Peca} = require('./../models/peca.js');
var {Kit} = require('./../models/kit.js');
var {PecaKit} = require('./../models/pecaKit.js');
var {User} = require('./../models/user.js');

var {kitCompleto} = require('./../controllers/kit.js');


var {ObjectID} = require('mongodb');

const port = process.env.PORT || 3000;
var app = express();

app.use(bodyParser.json());

// POST all

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

app.post('/kit', (req, res) => {
   var kit = new Kit({
      codigo:req.body.codigo,
      imagem:req.body.imagem,
      completed:req.body.completed,
   });

   kit.save().then((doc) => {
      res.status(200).send(doc);
   }, (e) => {
      res.status(400).send(e);
   });
});

app.post('/pecaKit', (req, res) =>{
   let quantidade = 1;
   PecaKit.find({ id_Kit: ObjectID(req.body.id_Kit), id_Peca: ObjectID(req.body.id_Peca) }).then((Asso) => {
      if (Asso.length > 0){
         console.log(Asso.length);
         let quantidade = Asso[0].quantidade + 1;
         //return res.status(303).send(Asso);
         if (!ObjectID.isValid(req.body.id_Kit) || !ObjectID.isValid(req.body.id_Peca)){
            return res.status(404).send("ERR 1");
         }

         var body = _.pick(req.body, ['id_Peca', 'id_Kit']);
         body.quantidade = quantidade;
         PecaKit.findByIdAndUpdate(ObjectID(Asso[0]._id), {$set: body}, {new: true}).then((pk) => {
            if (!pk){
               return res.status(404).send("ERR2");
            }
            res.send({pk});
         }).catch((e) => {
            res.status(400).send(e);
         });


      } else {
         var pecaKit = new PecaKit({
            id_Peca: req.body.id_Peca,
            id_Kit: req.body.id_Kit,
            quantidade: quantidade,
         });
         pecaKit.save().then(pk =>{
            res.send(pk);
         }).catch((e) => {
            res.status(400).send();
         });
      }
   });

});


app.post('/user', (req, res) => {
   var body = _.pick(req.body, ['email', 'password']);
   var user = new User(body);

   user.save().then((user) => {
      res.send(user);
   }).catch((e) => {
      res.status(400).send();
   });
});
//GET ALL

app.get('/peca', (req, res) => {
   Peca.find().then((pecas) =>{
      res.status(200).send({pecas});
   }, (e) => {
      res.status(400).send(e);
   })
});

app.get('/kit', (req, res) => {
   Kit.find().then((kits) =>{
      res.status(200).send({kits});
   }, (e) => {
      res.status(400).send(e);
   })
});

// Get BY id

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

});

app.get('/kit/:id', (req, res) => {
   var id = req.params.id;
   if (!ObjectID.isValid(id)){
      return res.status(404).send();
   }

   Kit.findById(id).then((kit) => {
      if(!kit){
         return res.status(404).send();
      }
      res.send({kit});
   }).catch((e) => {
      res.status(400).send(e);
   })

});

//DELETE BY ID

app.delete('/peca/:id', (req, res) =>{
   var id = req.params.id;
   if (!ObjectID.isValid(id)){
      return res.status(404).send();
   }

   Peca.findByIdAndRemove(id).then((peca) =>{
      if (!peca){
         return res.status(404).send();
      }
      res.send(peca);
   }).catch((e) => {
      res.status(400).send();
   });
});

app.delete('/kit/:id', (req, res) =>{
   var id = req.params.id;
   if (!ObjectID.isValid(id)){
      return res.status(404).send();
   }

   Kit.findByIdAndRemove(id).then((kit) =>{
      if (!kit){
         return res.status(404).send();
      }
      res.send(kit);
      PecaKit.remove({ id_Kit: ObjectID(id) }, (e) => {
         console.log(e);
      })

   }).catch((e) => {
      res.status(400).send();
   });
});

app.patch('/peca/:id', (req, res) => {
   var id = req.params.id;
   if (!ObjectID.isValid(id)){
      return res.status(404).send();
   }

   var body = _.pick(req.body, ['codigo', 'cor', 'tamanho']);

   Peca.findByIdAndUpdate(id, {$set: body}, {new: true}).then((peca) => {
      if (!peca){
         return res.status(404).send();
      }
      res.send({peca});
   }).catch((e) => {
      res.status(400).send(e);
   });
});

 app.listen(port, () => {
   console.log(`Server running on port ${port}`);
 });
