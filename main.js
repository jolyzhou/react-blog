var express =require('express');
var path =require('path');
var compression =require('compression');
var apiroute = require('./routers/apiroute');
var pageroute = require('./routers/pageroute');

var app = express();

app.use(compression());


app.use(express.static(path.join(__dirname, 'resource')));

/* route */
app.use('/api', apiroute.createApiRouter());
app.use('/', pageroute.createPageRouter());


var PORT = process.env.PORT || 8080;
app.listen(PORT, function() {
    console.log('Production Express server running at localhost:' + PORT);
});
