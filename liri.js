require('dotenv').config();
var axios = require("axios");
var keys = require("./keys.js");
var moment = require("moment");
var Spotify = require('node-spotify-api');
var fs = require("fs");

var arg1 = process.argv[2];
var arg2 = process.argv[3];



// Concert API
function concertThis(arg) {
    var queryURL = `https://rest.bandsintown.com/artists/${arg}/events?app_id=codingbootcamp`;

    axios.get(queryURL).then(
        function(response) {
            var events = response.data;

            events.forEach(element => {
                console.log('');
                console.log(`Venue: ${element.venue.name}`);
                console.log(`Venue location: ${element.venue.city}, ${element.venue.country}`);
                console.log(`Date: ${moment(element.datetime).format('MM/DD/YYYY')}`);
                console.log('------------');
            });
        }
    );

};

// Spotify API
function spotifyThisSong(arg) {
    var spotify = new Spotify({
      id: keys.spotify.id,
      secret: keys.spotify.secret,
    });

    if (arg == undefined) {
        arg = 'hello';
    }
     
    spotify.search({ type: 'track', query: arg }, function(err, data) {
      if (err) {
        return console.log('Error occurred: ' + err);
      }

      var song = data.tracks.items[0];
      
      console.log('');
      console.log(`Artist: ${song.artists[0].name}`);
      console.log(`Song: ${song.name}`);
      console.log(`Song Preview: ${song.preview_url}`);
      console.log(`Album Name: ${song.album.name}`)
    });
};

// OMDB API
function movieThis(arg) {
    var queryURL = `http://www.omdbapi.com/?t=${arg}&y=&plot=short&apikey=trilogy`;

    axios.get(queryURL).then(
        function(response) {
            var movie = response.data

            console.log('');
            console.log(`Title: ${movie.Title}`);
            console.log(`Release Year: ${movie.Year}`);
            console.log(`IMDB Rating: ${movie.imdbRating}`);
            console.log(`RT Rating: ${movie.Ratings[1].Value}`);
            console.log(`Produce in: ${movie.Country}`);
            console.log(`Language(s): ${movie.Language}`);
            console.log(`Plot: ${movie.Plot}`);
            console.log(`Actors: ${movie.Actors}`);

        }
    )
};

// reads text from file and calls function
function doWhatItSays() {
    fs.readFile("random.txt", "utf8", function(error, data) {

        if (error) {
            return console.log(error);
        }
    
        var instructions = data.split(',');
        arg1 = instructions[0];
        arg2 = instructions[1];

        switch(arg1) {

            case 'concert-this':
                concertThis(arg2);
                break;
        
            case 'spotify-this-song':
                spotifyThisSong(arg2);
                break;
        
            case 'movie-this':
                movieThis(arg2);
                break;
        
            default:
              console.log("choose another option");
          }
    
      });
}


// main switch statement

switch(arg1) {

    case 'concert-this':
        concertThis(arg2);
        break;

    case 'spotify-this-song':
        spotifyThisSong(arg2);
        break;

    case 'movie-this':
        movieThis(arg2);
        break;

    case 'do-what-it-says':
        doWhatItSays();
        break;

    default:
  
      console.log('');
      console.log('Your options are:');
      console.log('1. concert-this <band name>')
      console.log('2. movie-this <movie name>')
      console.log('3. spotify-this-song <song name>')
      console.log('4. update the random.txt file and then pass do-what-it-says as the only command line argument')

  };
