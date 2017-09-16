'use strict';

var db = require('./dynamoDbConnection');


module.exports = {
  search: search
};

function search(requestDate, searchTerm, then, error) {
    try {
        var client = db.getDbClient();
        
        var params = {
            TableName: "MovieList",
            FilterExpression: "contains(movieTitle, :searchTerm) or contains(Title, :searchTerm)",
            ExpressionAttributeValues: {
                ":searchTerm": searchTerm
            }
        }
    
        console.log('start to scan the table!');
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