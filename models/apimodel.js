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
        connection.query("select title, subtitle, tag, id from posts where is_pinned = ? order by id desc limit 1", [id], function (err, rows, fields) {
            return callback(rows);
        });
        connection.release();
    });
};

exports.post_detail = function (id, callback) {
    pool.getConnection(function(err, connection) {
        connection.query("select id, title, subtitle, tag, content_raw, is_pinned from posts where id = ? ", [id], function (err, rows, fields) {
            return callback(rows);
        });
        connection.release();
    });
};

exports.post_list = function (offset, limit, callback) {
    pool.getConnection(function(err, connection) {
        var sql = "select title, subtitle, tag, id from posts order by id desc limit "+parseInt(offset,10)+", "+parseInt(limit,10);
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

exports.save = function (b_id,b_title,b_subtitle,b_tags,b_pinned,b_content, callback) {
    pool.getConnection(function(err, connection) {
        if(b_id){
            var sql = "UPDATE posts SET title = " +mysql.escape(b_title)
                +", subtitle = "+mysql.escape(b_subtitle)
                +", tag = "+mysql.escape(b_tags)
                +", is_pinned = "+mysql.escape(b_pinned)
                +", content_raw = "+mysql.escape(b_content)
                +" WHERE id = "+b_id;
        } else {
            var sql = "INSERT INTO posts SET created_at = NOW(), title = " +mysql.escape(b_title)
                +", subtitle = "+mysql.escape(b_subtitle)
                +", tag = "+mysql.escape(b_tags)
                +", is_pinned = "+mysql.escape(b_pinned)
                +", content_raw = "+mysql.escape(b_content);
        }

        console.log(sql);
        connection.query(sql,function (err, result) {
            if(err) throw err;
            return callback(result.insertId);
        });
        connection.release();
    });
};

exports.update = function (data, callback) {
    pool.getConnection(function(err, connection) {
        var sql = "UPDATE posts SET  title = " +mysql.escape(data.b_title)
            +", subtitle = "+mysql.escape(data.b_subtitle)
            +", tag = "+mysql.escape(data.b_tags)
            +", is_pinned = "+mysql.escape(data.b_pinned)
            +", content_raw = "+mysql.escape(data.b_content)
            +" WHERE id = "+data.b_id;
        console.log(sql);
        connection.query(sql,function (err, result) {
            if(err) throw err;
            return callback("UPDATED");
        });
        connection.release();
    });
};