'use strict';

var SwaggerExpress = require('swagger-express-mw');
var app = require('express')();
module.exports = app; // for testing

var config = {
  appRoot: __dirname // required config
};

SwaggerExpress.create(config, function(err, swaggerExpress) {
  if (err) { throw err; }

  // install middleware
  swaggerExpress.register(app);

  if(process.env.NODE_ENV === 'development') {
    console.log("starting server ...")
    var port = process.env.PORT || 10010;
    app.listen(port);
    console.log("server listening at %s", port);
  }
});
