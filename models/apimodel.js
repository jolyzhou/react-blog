const mysql = require('mysql');
const crypto = require('crypto');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'blog'
});

exports.Pinnedpost_list = function (id, callback) {
    pool.getConnection(function(err, connection) {
        connection.query("select title, subtitle, tag, content_raw from posts where is_pinned = ? order by id desc limit 1", [id], function (err, rows, fields) {
            return callback(rows);
        });
        connection.release();
    });
};

exports.post_list = function (offset, limit, callback) {
    pool.getConnection(function(err, connection) {
        var sql = "select title, subtitle, tag, content_raw from posts order by id desc limit "+parseInt(offset,10)+", "+parseInt(limit,10);
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

exports.login = function (email, password, callback) {
    pool.getConnection(function(err, connection) {
        var sha_password = crypto.createHash('sha1').update(password).digest('hex');
        var sql = "select count(*) from users where email = "+mysql.escape(email)+" and password = "+mysql.escape(sha_password);
        console.log(sql);
        connection.query(sql,function (err, rows, fields) {
            return callback(rows);
        });
        connection.release();
    });
};