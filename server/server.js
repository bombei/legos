var express = require('express');
//var bodyParser = require('body-parser');
var _ = require('lodash');
var mysql = require ('mysql');

var conn = require('./../db/mysql.js');

const port = process.env.PORT || 3000;
var app = express();


//app.use(bodyParser.json());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// POST all

app.get('/peca', (req, res) => {
    let sql = "SELECT * FROM peca limit 0,20;";
    conn.query(sql, (err, result) => {
        if (err) res.status(400).send();
        res.send(result);
    });

});

app.get('/kit', (req, res) => {

    let sql = "SELECT * FROM conjunto_parte;"
    conn.query(sql, (err, result) => {
        if (err) res.status(400).send();
        res.send(result);
    });
});

// Get BY id

app.get('/peca/:id', (req, res) => {
    let id = req.params.id;
    let sql = "SELECT * FROM peca WHERE id = " + id + ";";
    conn.query(sql, (err, result) => {
        if (err) res.status(400).send();
        res.send(result);
    });
});


app.get('/kit/:id', (req, res) => {
    let id = req.params.id;
    let sql = "SELECT * FROM conjunto_parte WHERE id = " + id + ";";
    conn.query(sql, (err, result) => {
        if (err) res.status(400).send();
    res.send(result);
    });

});

app.get('/pecasKit/:id', (req, res) => {
    let id = req.params.id;
    let sql = "SELECT cp.*, p.* FROM peca_conjunto cp INNER JOIN peca p ON p.id = cp.peca WHERE conjunto_parte=" + id + ";";
    conn.query(sql, (err, result) => {
        if (err) res.status(400).send();
        res.send(result);
    });
});



 app.listen(port, () => {
   console.log(`Server running on port ${port}`);
 });
