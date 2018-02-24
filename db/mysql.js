var mysql = require ('mysql');

    var conn = mysql.createConnection({
        host:"127.0.0.1",
        user:"lego",
        port:"8889",
        password: "lego",
        database:"legolandia"
    });






    function query(sql, callback) {
        conn.connect(function(err){
            if (err) callback(err, null);
        });
        conn.query(sql, (err, result, fields) => {
            if (err) callback(err, null);
            callback(null, result);
        });
        conn.end();
    }

    function save(data, table, id, callback){
        conn.connect(function(err){
            if (err) callback(err, null);
        });

        conn.end();
    }

    function create(data, table, callback){
        conn.connect(function(err){
            if (err) callback(err, null);
        });

        conn.end();
    }

    var connection = {
        conn,
        query,
        save,
        create
    }
module.exports = connection;