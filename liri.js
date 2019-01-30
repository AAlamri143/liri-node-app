// node axios, spotify, 
require('dotenv').config();
var colors = require('colors/safe');
var axios = require("axios");
var Spotify = require('node-spotify-api');
var moment = require('moment');
moment().format();
// node fs (built in) 
var fs = require("fs");



//// API Commands & API Query
var newAsk = process.argv[2];
var newSearch = process.argv.slice(3);
var newSearchInQuery = newSearch.join("+");
var bitUrl = "https://rest.bandsintown.com/artists/" + newSearchInQuery + "/events?app_id=codingbootcamp";
var omdbUrl = "http://www.omdbapi.com/?t=" + newSearchInQuery + "&y=&plot=short&apikey=trilogy";

// ============== Spotify "Functions"
function spotifySearch() {

  var keys = require("./keys.js");
  var spotify = new Spotify(keys.spotify);

  var searchSong = newSearch;
  if (newSearch.length < 1) {
    searchSong = "The Sign Ace of Base";
  }
  spotify.search({ type: 'track', query: searchSong }, function (err, data) {
    if (err) {
        return console.log('Error occurred: ' + err);
    }

      console.log(colors.underline.yellow.bold("\n\n∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆-((") + colors.white.bold(" M U S I C ") + colors.underline.yellow.bold("))-∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆\n"));
      console.log(colors.rainbow("       " + data.tracks.items[0].artists[0].name) + colors.rainbow(" - < " + data.tracks.items[0].name + " >\n"));
      console.log(colors.underline.white.bold("Artist:") + colors.white.bold(" " + data.tracks.items[0].artists[0].name));
      console.log(colors.underline.white.bold("Album Name:") + colors.white.bold(" " + data.tracks.items[0].album.name));
      console.log(colors.underline.white.bold("preview-link:") + " " + colors.underline.cyan(data.tracks.items[0].album.external_urls.spotify));
      console.log(colors.underline.yellow.bold("\n∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆\n\n"));

    });
}


// ========BandInTown axios call 
function bitSearch() {
  axios.get(bitUrl).then(
    function (response) {
    console.log(colors.underline.yellow.bold("\n\n∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆-((") + colors.white.bold(" E V E N T ") + colors.underline.yellow.bold("))-∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆\n"));
    console.log(colors.rainbow("            " + response.data[0].venue.name) +"\n");
    console.log(colors.underline.bold("Name of the Venue:") + " " + colors.bold(response.data[0].venue.name));
    console.log(colors.underline.bold("Date of the Event:") + " " + colors.bold(moment(response.data[0].datetime).format('L') + " (MM/DD/YYY)"));
    console.log(colors.underline.yellow.bold("\n∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆\n\n"));
  }
  );
}


//====== OMDB axios Call
function omdbSearch(){
  axios.get(omdbUrl).then(
      function (response){
      console.log(colors.underline.yellow.bold("\n\n∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆-((") + colors.white.bold(" M O V I E ") + colors.underline.yellow.bold(")-∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆\n"));
      console.log(colors.rainbow("                " + response.data.Title) + colors.rainbow(" (" + response.data.Year + ")\n"));
      console.log(colors.underline.bold("IMDB Rating:") + colors.bold("  " + response.data.imdbRating));
      console.log(colors.underline.bold("Rotten Tomatoes Rating:") + colors.bold("  " + response.data.Ratings[1].Value));
      console.log(colors.underline.bold("Country:") + colors.bold("  " + response.data.Country));
      console.log(colors.underline.bold("Language:") + colors.bold("  " + response.data.Language));
      console.log(colors.underline.bold("Actors:") + "  " + colors.bold(response.data.Actors));
      console.log(colors.underline.bold("Plot:") + " " + colors.bold(response.data.Plot));
      console.log(colors.underline.yellow.bold("\n∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆\n\n"));

    }
  );
}

/////// Call function
if (newAsk === "concert-this") {
  bitSearch();
}
else if (newAsk === "spotify-this-song") {
  spotifySearch();
}
else if (newAsk === "movie-this" && newSearch.length > 0) {
  omdbSearch();
}
else if (newAsk === "movie-this" && !newSearch.length > 0) {
  omdbUrl = "http://www.omdbapi.com/?t=Mr.+Nobody&y=&plot=short&apikey=trilogy"
  omdbSearch();
}
else if (newAsk === "do-what-it-says") {
  fs.readFile("random.txt", "utf8", function (error, data) {
      if (error) { return console.log(error); }
      console.log(data);
      var dataArr = data.split('"');
      newAsk = dataArr[0];
      newSearch = dataArr[1];
      spotifySearch();
  });
}


////Log Bonus
var searchText = newSearch;
if (newSearch.length < 1) {
    searchText = "None"
}
var addText = ' • Command: "' + newAsk + '"  Search: "' + searchText + '"  (' + moment().format('lll') + ')' + '\r\n';
fs.appendFile("log.txt", addText, function (err) {
    if (err) {
        console.log(err);
    }
    else {
        console.log('"log has updated!"');
    }
});