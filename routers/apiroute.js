var express = require('express');
var apimodel = require('../models/apimodel');
var bodyParser = require("body-parser");

exports.createApiRouter = function () {
    var router = express.Router();
    router.use(bodyParser.urlencoded({ extended: false }));
    router.use(bodyParser.json());
    router.get('/list', function (req, res) {
        apimodel.Pinnedpost_list('YES',function (result) {
            res.status(200).json({
                pin: result
            });
        });

    });
    router.post('/alllist', function (req, res) {
        var offset = req.body.offset;
        var limit = req.body.limit;
        apimodel.post_list(offset,limit,function (result) {
            res.status(200).json({
                data: result
            });
        });

    });
    router.post('/login', function (req, res) {
        var email = req.body.email;
        var password = req.body.password;
        apimodel.login(email,password,function (result) {
            res.status(200).json({
                isexist: result[0]['count(*)']
            });
        });

    });
    router.get('/allcount', function (req, res) {
        apimodel.post_list_count(function (result) {
            res.status(200).json({
                num: result[0]['count(*)']
            });
        });

    });
    router.get('/getinfo', function (req, res) {
        res.send('getinfo');
    });
    return router;
};