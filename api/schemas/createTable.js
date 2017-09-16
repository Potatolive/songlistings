var AWS = require('aws-sdk');
var movie = require('./movie');

var config = {
  "apiVersion": "2012-08-10",
  "accessKeyId": "abcde",
  "secretAccessKey": "abcde",
  "region":"ap-south-1",
  "endpoint": "http://localhost:8000"
}

AWS.config.update({
  region: "us-west-2",
  endpoint: "http://localhost:8000"
});


var db = new AWS.DynamoDB(config);

function createTable(params) {
    db.listTables(function(err, data) {
        if(!err) {
            if(data.TableNames.indexOf(params.TableName) < 0) {
                db.createTable(params, function(err, data) {
                    if (err) {
                        console.error("Unable to create table. Error JSON:", JSON.stringify(err, null, 2));
                    } else {
                        console.log("Created table. Table description JSON:", JSON.stringify(data, null, 2));
                    }
                });
            } else {
                console.log('Table %s already present', params.TableName);
            }
        } else {
            console.log(err);
        }
    });
}

createTable(movie.params);