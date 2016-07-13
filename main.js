var express =require('express');
var path =require('path');
var compression =require('compression');

var app = express();

app.use(compression());


app.use(express.static(path.join(__dirname, 'resource')));

var createPageRouter = function() {
    var router = express.Router();
    router.get('*', function (req, res) {
        res.sendFile(path.join(__dirname,'resource', 'index.html'));
    });
    return router;
};

var createApiRouter = function () {
    var router = express.Router();
    router.get('/list', function (req, res) {
        res.status(200).json({one: 'i am here'});
    });
    router.get('/getinfo', function (req, res) {
        res.send('getinfo');
    });
    return router;
}

var pagesRouter = createPageRouter();
var apiRouter = createApiRouter();
app.use('/api', apiRouter);
app.use('/', pagesRouter);


var PORT = process.env.PORT || 8080;
app.listen(PORT, function() {
    console.log('Production Express server running at localhost:' + PORT);
});
