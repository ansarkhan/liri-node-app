require('dotenv').config();
var axios = require("axios");
var keys = require("./keys.js");
var moment = require("moment");
var Spotify = require('node-spotify-api');

var arg1 = process.argv[2];
var arg2 = process.argv[3];


/*
TO DOS
- add in date time module
- make it all one function

*/



switch(arg1) {

    case 'concert-this':
      console.log("concert api");
      var queryURL = `https://rest.bandsintown.com/artists/${arg2}/events?app_id=codingbootcamp`;

      axios.get(queryURL).then(
          function(response) {
              var events = response.data;
              events.forEach(element => {
                  console.log(`Venue: ${element.venue.name}`);
                  console.log(`Venue location: ${element.venue.city}, ${element.venue.country}`);
                  console.log(`Date: ${element.datetime}`);
                  console.log('------------');
              });
          }
      );

      break;

    case 'spotify-this-song':
      console.log("spotify API");
      var spotify = new Spotify({
        id: keys.spotify.id,
        secret: keys.spotify.secret,
      });
      // default to sign;
       
      spotify.search({ type: 'track', query: arg2 }, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }

        var song = data.tracks.items[0];
    
        console.log(`Artist: ${song.artists[0].name}`);
        console.log(`Song: ${song.name}`);
        console.log(`Song Preview: ${song.preview_url}`);
        console.log(`Album Name: ${song.album.name}`)
      });

      break;

    case 'movie-this':
        console.log("movie-api");
        var queryURL = `http://www.omdbapi.com/?t=${arg2}&y=&plot=short&apikey=trilogy`;

        axios.get(queryURL).then(
            function(response) {
                var movie = response.data
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
        break;

    case 'do-what-it-says':
        console.log("do what it says api");
        break;
    default:
      console.log("choose another option");
  }


//   
// * Artist(s)

// * The song's name

// * A preview link of the song from Spotify

// * The album that the song is from

// * If no song is provided then your program will default to "The Sign" by Ace of Base.