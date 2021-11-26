const SpotifyWebApi = require('spotify-web-api-node');
// import the spotify web api node module//
var express = require('express');
var app = express();
var dotenv = require('dotenv');
dotenv.config();
const token = process.env.Oauthtoken;
// token generated running authorization.js//
//expires every one hour//
// needs to be refreshed //

const spotifyApi = new SpotifyWebApi();
spotifyApi.setAccessToken(token);


//  searh songs by track name //
app.get('/trackname/:name', function (req, res) {
    spotifyApi.searchTracks(req.params.name,{limit:2})
    .then(function(data) {
      res.send(data.body.tracks.items);
    }, function(err) {
    console.log(err);
  });

})
// search songs by artist name //
app.get('/artistname/:aname', function (req, res) {
  spotifyApi.searchTracks(`artist:${req.params.aname}`,{limit:2})
     .then(function(data) {
      res.send(data.body.tracks.items);
    }, 
      function(err) {
     console.log(err);
  });
})

// search an artist famous songs //
app.get('/artisttoptracks/:artistid', function(req, res) {
  spotifyApi.getArtistTopTracks(req.params.artistid, 'GB')
  .then(function(data) {
    res.send(data.body.tracks);
    }, function(err) {
    console.log('Something went wrong!', err);
  });
})
//sorting here is done on the basis of popularity key//

//Arijit's ID = 4YRxDV8wJFPHPTeXepOstw //


// search songs by playlist
app.get('/playlist/:pname', function (req, res) {
spotifyApi.searchPlaylists(req.params.pname)
  .then(function(data) {
    res.send(data.body);
  }, function(err) {
    console.log('Something went wrong!', err);
  });
})

// no point --> needs to redirect to spotify inorder to search tracks of the searched playlist//

// search by trackname wrt artist ---------------------> doubt//
app.get('/track/artist/:trackname/:artistname', function(req,res){
  spotifyApi.searchTracks(`track:${req.params.trackname} artist:${req.params.artistname}`,{limit:2})
  .then(function(data) {
    res.send(data.body.tracks.items);
  }, function(err) {
    console.log('Something went wrong!', err);
  });
})

// search track  audio features //
app.get('/trackaudiofeatures/:trackid', function(req,res){
  spotifyApi.getAudioFeaturesForTrack(req.params.trackid)
  .then(function(data) {
    res.send(data.body);
  }, function(err) {
      console.log(err);
  });

})


//search track based on ids
   


app.get('/trackid/:tid', function (req, res) {
  spotifyApi.searchTracks(`id:${req.params.id}`)
     .then(function(data) {
      res.send(data.body);}, 
      function(err) {
     console.log(err);
  });

})
//tum ho id : 7uNnlVit5qDvfOje0pqICF


app.listen(7000,function(){
    console.log('listening on port 7000, go to localhost:7000')
})









