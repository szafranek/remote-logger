/*jslint white:true, plusplus:true, nomen:true, vars:true, node:true */
(function() {
    "use strict";
    var http = require('http');
    var fs = require('fs');
    var url = require('url');

    var server = http.createServer(function(req, res) {
        var file = fs.openSync('data.txt', 'a', 666);
        
        var urlParts = url.parse(req.url, true);
        var param = urlParts.query.param;
        
        if (param) {
            var now = new Date();
            var time = now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds() + ";";
            fs.writeSync(file, time + param + "\n");
            console.log("Query received:", param);
        }
                
        res.writeHead(200, {
            "Content-Type": "text/html"
        });
        res.end();
        
    });
    
    server.listen(6789);
}());