/*jslint white:true, plusplus:true, nomen:true, vars:true, node:true */
(function() {
    "use strict";
    var http = require('http');
    var fs = require('fs');
    var url = require('url');
    
    var fpsTotal = 0;
    var fpsCount = 0;
    
    var server = http.createServer(function(req, res) {
        var file = fs.openSync('data.txt', 'a', 666);
        
        var urlParts = url.parse(req.url, true);
        var params = JSON.stringify(urlParts.query);
        
        if (params && params !== "{}") {
            var now = new Date();
            var time = [now.getFullYear(), (now.getMonth() + 1), now.getDate()].join(".") + " " + [now.getHours(), now.getMinutes(), now.getSeconds()].join(":") + ";";
            fs.writeSync(file, time + params + "\n");
            
            fpsTotal += parseInt(urlParts.query.fps, 10);
            fpsCount++;
            
            console.log(params);
            console.log("average: " + (fpsTotal / fpsCount));
        }
        fs.close(file);
        res.writeHead(200, {
            "Content-Type": "text/html",
            "Access-Control-Allow-Origin": "*"
        });
        res.end("query received");
        
    });
    
    server.listen(6789);
}());