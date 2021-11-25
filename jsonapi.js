var http = require('http');
var fs = require('fs');

var server = http.createServer((req,res) => {
        fs.readFile('John Mayer Playlist.json','utf-8',function(err,data){
            if(err) throw err;
            res.write(data);
            res.end();
        })
    })
    

server.listen(7000)