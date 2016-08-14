const mysql = require('mysql');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'blog'
});

exports.Pinnedpost_list = function (id, callback) {
    pool.getConnection(function(err, connection) {
        connection.query("select title, subtitle, content_raw from posts where id = ?", [id], function (err, rows, fields) {
            return callback(rows);
        });
        connection.release();
    });
};

exports.post_list = function (offset, limit, callback) {
    pool.getConnection(function(err, connection) {
        var sql = "select title, subtitle, content_raw from posts limit "+parseInt(offset,10)+", "+parseInt(limit,10);
        console.log(sql);
        connection.query(sql,function (err, rows, fields) {
            return callback(rows);
        });
        connection.release();
    });
};

exports.post_list_count = function (callback) {
    pool.getConnection(function(err, connection) {
        connection.query("select count(*) from posts ", function (err, rows, fields) {
            return callback(rows);
        });
        connection.release();
    });
};
