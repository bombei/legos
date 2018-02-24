var mysql = require ('mysql');

    var conn = mysql.createConnection({
        host:"127.0.0.1",
        user:"lego",
        port:"8889",
        password: "lego",
        database:"legolandia"
    });




    let result = []

    function query(sql, callback) {
        conn.connect(function(err){
            if (err) callback(err, null);
        });
        //conn.query(sql).on('err').on('result')
        conn.query(sql, (err, result, fields) => {
            if (err) callback(err, null);
            callback(null, result);
        }).on('end',() => {
            if(typeof callback == "function") {
                callback(null,result);
            } else
            return result;
        });
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