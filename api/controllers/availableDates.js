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
  getAvailableDates: getAvailableDates
};

/*
  Functions in a127 controllers used for operations should take two parameters:

  Param 1: a handle to the request object
  Param 2: a handle to the response object
 */
function pad(n) {return n < 10 ? "0"+n : n;} //TODO - Move this to date util

Date.prototype.yyyymmdd = function() {
        var mm = this.getMonth() + 1; // getMonth() is zerobased
        var dd = this.getDate();
    
        return [this.getFullYear(),
                (mm>9 ? '' : '0') + mm,
                (dd>9 ? '' : '0') + dd
               ].join('');
    };

function getAvailableDates(req, res) {
    console.log('Dates request ...!');
    var aryDates = [];
    var daysToAdd = 7;

    for (var i = 0; i < daysToAdd; i++) {
        var currentDate = new Date();
        currentDate.setDate(currentDate.getDate() + i);
        console.log(currentDate);
        aryDates.push(
            {'Date': currentDate.yyyymmdd(), 'Enabled': true}
        );
    }

    res.json(aryDates);
}