var express = require('express');
var path = require('path');

exports.createPageRouter = function() {
    var router = express.Router();
    router.get('*', function (req, res) {
        res.sendFile(path.join(__dirname,'resource', 'index.html'));
    });
    return router;
};