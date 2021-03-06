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
var songs = require('../helpers/dbSongs')

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
    getSong: getSong
};

/*
  Functions in a127 controllers used for operations should take two parameters:

  Param 1: a handle to the request object
  Param 2: a handle to the response object
 */
function searchSongByName(req, res) {
  // variables defined in the Swagger document can be referenced using req.swagger.params.{parameter_name}

  console.log('Swagger: ' + req.swagger.params);

  var requestDate = req.swagger.params.requestDate.value;
  var searchTerm = ""
  if(req.swagger.params.searchTerm) searchTerm = req.swagger.params.searchTerm.value;

  console.log("Request Date: " + requestDate);
  console.log("Search Term: " + searchTerm);

  if(!searchTerm) searchTerm = "";

  songs.search(requestDate, searchTerm.toLowerCase(), 
    function(data) {
      res.json(data);
    }, 
    function(error) {
      console.log(error);
      res.json(error);
    }
  );
}

function getSong(req, res) {
  var id = req.swagger.params.id.value;

  console.log("Song Id Requested: " + id);

  songs.get_song(id, function(data) {
    res.json(data);
  }, 
  function(error) {
    console.log(error);
    res.json(error);
  });
}