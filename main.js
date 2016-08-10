var express =require('express');
var path =require('path');
var compression =require('compression');
var apiroute = require('./routers/apiroute');
var pageroute = require('./routers/pageroute');
var webpack = require('webpack');
var WebpackDevMid = require('webpack-dev-middleware');
var WebpackHotMid = require('webpack-hot-middleware');
var config = require('./webpack.main.config');

var compiler = webpack(config);

var app = express();

app.use(compression());

app.use(WebpackDevMid(compiler,{
    noInfo: true,
    publicPath: config.output.publicPath
}));

app.use(WebpackHotMid(compiler));

app.use(express.static(path.join(__dirname, 'resource')));

/* route */
app.use('/api', apiroute.createApiRouter());
app.use('/', pageroute.createPageRouter());


var PORT = process.env.PORT || 8080;
app.listen(PORT, function() {
    console.log('Production Express server running at localhost:' + PORT);
});
