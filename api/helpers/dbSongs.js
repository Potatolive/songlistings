'use strict';

var db = require('./dynamoDbConnection');


module.exports = {
  search: search,
  get_song: get_song
};

function search(requestDate, searchTerm, then, error) {
    try {
        var client = db.getDbClient();
        
        var params = {
            TableName: "MovieList"
        }

        if(searchTerm && searchTerm != '') {
            params.FilterExpression = "contains(MovieTitle, :searchTerm) or contains(Title, :searchTerm)";
            params.ExpressionAttributeValues = {
                ":searchTerm": searchTerm
            }
        } else {
            params.Limit = 100
        }
    
        console.log('start to scan the table! ' + JSON.stringify(params));
        client.scan(params, function(err, data) {
            if(err) {
                console.log('scan completed with error!');
                console.log(err);
                error({"message": err})
            }
            else {
                then(data.Items);
            }
        });
    } catch(ex) {
        console.log('scan completed with error!');
        console.log(ex);
        error({"message": "Error access database!"});
    }
}

function get_song(id, then, error) {
    try {
        var client = db.getDbClient();
        
        var params = {
            TableName: "MovieList",
            IndexName: "uniqueSongs",
            KeyConditionExpression: "UniqueId = :uniqueId",
            ExpressionAttributeValues: {
                ":uniqueId": id
            },
            ProjectionExpression: "UniqueId, Title, MovieTitle, MoviePosterUrl"
        }

        console.log('start to scan the table! ' + JSON.stringify(params));
        client.query(params, function(err, data) {
            if(err) {
                console.log('query completed with error!');
                console.log(err);
                error({"message": err})
            }
            else {
                console.log("Success" + JSON.stringify(data));
                then(data.Items[0]);
            }
        });
    } catch(ex) {
        console.log('query completed with error!');
        console.log(ex);
        error({"message": "Error access database!"});
    }
}