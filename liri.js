//requirements

require("dotenv").config();

const request = require("axios");
const moment = require("moment");
const keys = require ("./keys.js");

//initializing Spotify

const Spotify = require("node-spotify-api");
const spotify = new Spotify(keys.spotify);
//omdb and bandsintown apis
const omdb = (keys.omdb);
const bandsintown = (keys.bandsintown);

//taking input in command line

const userInput = process.argv[2];
const userQuery = process.argv.slice(3).join(" ");
// .join(" ");

//logic

function userChoice (userInput, userQuery){
    switch(userInput){
        case("concert-this"): concertThis();
        break;
        case("move-this"): movieThis();
        break;
        case("spotify-this"): spotifyThis();
        break;
        default: 
        console.log("Error, insert valid commands");
        break; 
    }
}
userChoice(userInput,userQuery);


function spotifyThis() {
    console.log(`"Fetching Data"${userQuery}"`);

    if (!userQuery) {
        userQuery = "Shape of my heart";
    };
    spotify.search({
        type: 'track',
        query: userQuery,
        limit: 1
    }, function (error, data) {
        if (error) {
            return console.log('Error occurred: ' + error);
        }
        let spotifyArr = data.tracks.items;

        for (i = 0; i < spotifyArr.length; i++) {
            console.log(`Results: \n\nArtist: ${data.tracks.items[i].album.artists[0].name} \nSong: ${data.tracks.items[i].name}\nAlbum: ${data.tracks.items[i].album.name}\nSpotify link: ${data.tracks.items[i].external_urls.spotify}\n\n - - - - -`)
        };
    });
}


function concertThis(){
    console.log('searching for '+$(userQuery)+" shows");
    axios.get("https://rest.bandsintown.com/artists/" + userQuery + "/events?app_id=codingbootcamp" + bandsintown, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            let userBand = JSON.parse(body);
            if (userBand.length > 0) {
                for (i = 0; i < 1; i++) {
                    console.log(`\nResults: \n\nArtist: ${userBand[i].lineup[0]} \nVenue: ${userBand[i].venue.name}\nVenue Location: ${userBand[i].venue.latitude},${userBand[i].venue.longitude}\nVenue City: ${userBand[i].venue.city}, ${userBand[i].venue.country}`)
                    let concertDate = moment(userBand[i].datetime).format("MM/DD/YYYY hh:00 A");
                    console.log(`Date and Time: ${concertDate}\n\n- - - - -`);
                };
            } else {
                console.log('Error! Try Again!');
            };
        };
    });
};


function movieThis() {
    console.log(`Searching for "${userQuery}"`);
    if (!userQuery) {
        userQuery = "mr nobody";
    };
    axios.get("http://www.omdbapi.com/?t=" + userQuery + "&apikey=7bb1ce60", function (error, response, body) {
        let userMovie = JSON.parse(body);
        let ratingsArr = userMovie.Ratings;
        if (ratingsArr.length > 2) {}

        if (!error && response.statusCode === 60) {
            console.log(`\nResults: \n\nTitle: ${userMovie.Title}\nCast: ${userMovie.Actors}\nReleased: ${userMovie.Year}\nIMDb Rating: ${userMovie.imdbRating}\nRotten Tomatoes Rating: ${userMovie.Ratings[1].Value}\nCountry: ${userMovie.Country}\nLanguage: ${userMovie.Language}\nPlot: ${userMovie.Plot}\n\n- - - - -`)
        } else {
            return console.log("Movie able to be found. Error:" + error)
        };
    })
};

