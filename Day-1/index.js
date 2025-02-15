var http = require('http');
var moment = require('moment');

http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write('Hello World! The time is: ' + moment().format());
    res.end();
}).listen(3030);