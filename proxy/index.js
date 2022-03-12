var proxy = require('express-http-proxy');
var app = require('express')();


const compression = require('compression')

app.use(compression())

app.use('/', proxy('localhost:3005'));

app.listen(3000)