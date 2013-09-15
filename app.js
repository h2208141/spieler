var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var spieler = require('./routes/spieler');
var http = require('http');
var path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

var SpielerManager = require('./routes/spieler').SpielerManager;
var spielerManagerService = new SpielerManager(app);

app.get('/', routes.index);
app.get('/users', user.list);
// app.get('/spieler', spieler.list);


// development only
if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}

http.createServer(app).listen(app.get('port'), function(){
    console.log('Spieler App läuft auf Port '+ app.get('port'));
    console.log('URL: http://localhost:'+ app.get('port'));
});
