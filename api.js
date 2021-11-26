var express = require('express');
var app = express();
var dotenv = require('dotenv');
var mongo = require('mongodb')
var MongoClient=mongo.MongoClient;
dotenv.config()
var mongourl = process.env.MongoLiveUrl;
var port = process.env.PORT || 3001;
var db;

app.get('/', function(req, res){
    res.send("Welcome to the Tuneity Api");
})

// Get a genre by name //
app.get('/genre/:gname', function(req,res){
    db.collection('genre').find({"category": req.params.gname}).toArray(function(err,result){
        if(err) throw err;
        res.send(result)
    })
})
// get songs wrt genre // 
app.get('/songlist/:gname', function(req,res){
    db.collection('songs').find({"genre": req.params.gname}).toArray(function(err,result){
        if(err) throw err;
        res.send(result)
    })
})

// get song details by id//
app.get('/songdetails/:songid', function(req,res){
    db.collection('songs').find({"id": req.params.songid}).toArray(function(err,result){
        if(err) throw err;
        res.send(result)
    })
})
// get songs in genre sorted by year (latest ones first) //
app.get('/latestsong/:genreid', function(req,res){
    var sort={"year":-1}
    db.collection('songs').find({"category_id": Number(req.params.genreid)}).sort(sort).toArray(function(err,result){
        if(err) throw err;
        res.send(result)

  })
})



// connection code//
MongoClient.connect(mongourl,function(err,client) {
    if(err) console.log("Unable to connect");
    db=client.db('edureka')
    app.listen(port, function(){
        console.log(`Connected to port ${port}`)
    })
})
