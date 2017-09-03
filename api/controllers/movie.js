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
    searchMovieByName: searchMovieByName
};

/*
  Functions in a127 controllers used for operations should take two parameters:

  Param 1: a handle to the request object
  Param 2: a handle to the response object
 */
function searchMovieByName(req, res) {
  // variables defined in the Swagger document can be referenced using req.swagger.params.{parameter_name}
  var requestDate = req.swagger.params.requestDate.value;
  var movieName = req.swagger.params.movieName.value;

  console.log("Request Date: " + requestDate);
  console.log("Movie Name: " + movieName);

  // this sends back a JSON response which is a single string
  res.json(searchMovie(requestDate, movieName));
}

function searchMovie(requestDate, movieName) {
    var movies = [
        {
            "_id": guid(),
            "title": "Bairavaa",
            "posterUrl": "https://upload.wikimedia.org/wikipedia/en/4/46/Bairavaa_movie_poster.jpg",
            "director": "Bharathan",
            "cast": "Vijay, Keerthy Suresh, Sathish, Jagapati Babu, Daniel Balaji",
            "musicDirector": "",
            "genre": "Action masala",
            "producer": "Vijaya Productions",
            "opening": "20170112"
        },
        {
            "_id": guid(),
            "title": "Koditta Idangalai Nirappuga",
            "posterUrl": "https://upload.wikimedia.org/wikipedia/en/a/ae/Koditta_Idangalai_Nirappuga_poster.jpg",
            "director": "R. Parthiepan",
            "cast": "Shanthanu Bhagyaraj, Parvathy Nair, R. Parthiepan, Thambi Ramaiah",
            "musicDirector": "C. Sathya",
            "genre": "Comedy thriller",
            "producer": "Reel Estate Company & Bioscope Film Frames",
            "opening": "20170114"
        },
        {
            "_id": guid(),
            "title": "Adhe Kangal",
            "posterUrl": "https://upload.wikimedia.org/wikipedia/en/c/c5/Adhe_Kangal_2017.jpg",
            "director": "Rohin Venkatesan",
            "cast": "Kalaiyarasan, Sshivada, Janani Iyer, Bala Saravanan",
            "musicDirector": "Ghibran",
            "genre": "Crime thriller",
            "producer": "Thirukumaran Entertainment",
            "opening": "20170126"
        },
        {
            "_id": guid(),
            "title": "Bogan",
            "posterUrl": "https://upload.wikimedia.org/wikipedia/en/5/53/Bogan_2017_poster.jpg",
            "director": "Lakshman",
            "cast": "Jayam Ravi, Arvind Swamy, Hansika Motwani, Varun, Akshara Gowda",
            "musicDirector": "",
            "genre": "Supernatural thriller",
            "producer": "Prabhu Deva Studios",
            "opening": "20170202"
        },
        {
            "_id": guid(),
            "title": "Si3",
            "posterUrl": "https://upload.wikimedia.org/wikipedia/en/8/87/Singam_3_poster.jpg",
            "director": "Hari",
            "cast": "Suriya, Shruti Haasan, Anushka Shetty, Thakur Anoop Singh",
            "musicDirector": "Harris Jayaraj" ,
            "genre": "Action masala",
            "producer": "Studio Green",
            "opening": "20170209"
        }
    ]

    return movies;
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