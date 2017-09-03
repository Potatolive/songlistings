'use strict';
/*
 'use strict' is not required but helpful for turning syntactical errors into true errors in the program flow
 https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode
*/

/*
 Modules make it possible to import JavaScript files into your application.  Modules are imported
 using 'require' statements that give you a reference to the module.

  It is a good idea to list the modules that your application depends on in the package.json in the project root
 */
var util = require('util');

/*
 Once you 'require' a module you can reference the things that it exports.  These are defined in module.exports.

 For a controller in a127 (which this is) you should export the functions referenced in your Swagger document by name.

 Either:
  - The HTTP Verb of the corresponding operation (get, put, post, delete, etc)
  - Or the operationId associated with the operation in your Swagger document

  In the starter/skeleton project the 'get' operation on the '/hello' path has an operationId named 'hello'.  Here,
  we specify that in the exports of this module that 'hello' maps to the function named 'hello'
 */
module.exports = {
    searchSongByName: searchSongByName,
    getSongsForAMovie: searchSongByName
};

/*
  Functions in a127 controllers used for operations should take two parameters:

  Param 1: a handle to the request object
  Param 2: a handle to the response object
 */
function searchSongByName(req, res) {
  // variables defined in the Swagger document can be referenced using req.swagger.params.{parameter_name}
//   var requestDate = req.swagger.params.requestDate.value;
//   var songName = req.swagger.params.songName.value;
//   var movieId = req.swagger.params.movieId.value;

//   console.log("Request Date: " + requestDate);
//   console.log("Song Name: " + songName);
//   console.log("Movie ID: " + movieId);

  // this sends back a JSON response which is a single string
  res.json(searchSong());
}

function searchSong() {
    var songs = [
        {
            "_id": guid(),
            "seqNo": 1,
            "movieTitle": "Bairavaa",
            "title": "Pattaya Kelappu",
            "posterUrl": "https://upload.wikimedia.org/wikipedia/en/4/46/Bairavaa_movie_poster.jpg",
            "musicDirector": "Santhosh Narayanan",
            "lyrics": "Vairamuthu",
            "singers": "Ananthu, Benny Dayal",
            "length": "4:46"
        },
        {
            "_id": guid(),
            "seqNo": 2,
            "movieTitle": "Bairavaa",
            "title": "Nilaayo",
            "posterUrl": "https://upload.wikimedia.org/wikipedia/en/4/46/Bairavaa_movie_poster.jpg",
            "musicDirector": "Santhosh Narayanan",
            "lyrics": "Vairamuthu",
            "singers": "Haricharan",
            "length": "4:13"
        },
        {
            "_id": guid(),
            "seqNo": 3,
            "movieTitle": "Bairavaa",
            "title": "Pa Pa",
            "posterUrl": "https://upload.wikimedia.org/wikipedia/en/4/46/Bairavaa_movie_poster.jpg",
            "musicDirector": "Santhosh Narayanan",
            "lyrics": "Vairamuthu",
            "singers": "Vijay, Priyadarshini",
            "length": "4:07"
        },
        {
            "_id": guid(),
            "seqNo": 4,
            "movieTitle": "Bairavaa",
            "title": "Azhagiya Soodana Poovey",
            "posterUrl": "https://upload.wikimedia.org/wikipedia/en/4/46/Bairavaa_movie_poster.jpg",
            "musicDirector": "Santhosh Narayanan",
            "lyrics": "Vairamuthu",
            "singers": "Vijaynarain, Darshana KT",
            "length": "4:41"
        },
        {
            "_id": guid(),
            "seqNo": 1,
            "movieTitle": "Bairavaa",
            "title": "Pattaya Kelappu",
            "posterUrl": "https://upload.wikimedia.org/wikipedia/en/4/46/Bairavaa_movie_poster.jpg",
            "musicDirector": "Santhosh Narayanan",
            "lyrics": "Arunraja Kamaraj, Roshan Jamrock",
            "singers": "Arunraja Kamaraj, Roshan Jamrock",
            "length": "3:56"
        }
    ]

    return songs;
}

function guid() {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
      s4() + '-' + s4() + s4() + s4();
  }