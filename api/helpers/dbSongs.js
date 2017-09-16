'use strict';

var db = require('./dynamoDbConnection');


module.exports = {
  search: search
};

function search(requestDate, searchTerm, then, error) {
    try {
        var client = db.getDbClient();
        
        var params = {
            TableName: "MovieList"
        }

        if(searchTerm && searchTerm != '') {
            params.FilterExpression = "contains(movieTitle, :searchTerm) or contains(Title, :searchTerm)";
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