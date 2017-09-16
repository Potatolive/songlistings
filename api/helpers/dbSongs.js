var AWS = require('aws-sdk');
var config = {
  "apiVersion": "2012-08-10",
  "accessKeyId": "abcde",
  "secretAccessKey": "abcde",
  "region":"ap-south-1",
  "endpoint": "http://localhost:8000"
}
var db = new AWS.DynamoDB.DocumentClient(config);

module.exports = {
  search: search
};

function search(requestDate, searchTerm, then, error) {
    params = {
        TableName: "MovieList",
        FilterExpression: "contains(movieTitle, :searchTerm) or contains(Title, :searchTerm)",
        ExpressionAttributeValues: {
            ":searchTerm": searchTerm
        }
    }

    db.scan(params, function(err, data) {
        if(err) {
            console.log(err);
            error(err)
        }
        else {
            console.log(data.Items);
            then(data.Items);
        }
    });
}