var express = require('express');

exports.createApiRouter = function () {
    var router = express.Router();
    router.get('/list', function (req, res) {
        res.status(200).json({one: 'i am here'});
    });
    router.get('/getinfo', function (req, res) {
        res.send('getinfo');
    });
    return router;
};