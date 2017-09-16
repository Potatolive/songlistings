var AWS = require('aws-sdk');
var config = {
  "apiVersion": "2012-08-10",
  "accessKeyId": "abcde",
  "secretAccessKey": "abcde",
  "region":"ap-south-1",
  "endpoint": "http://localhost:8000"
}
var db = new AWS.DynamoDB.DocumentClient(config);

var tableDefinition = {
    TableName : "Movießs",
    KeySchema: [       
        { AttributeName: "year", KeyType: "HASH"},  //Partition key
        { AttributeName: "title", KeyType: "RANGE" }  //Sort key
    ],
    AttributeDefinitions: [       
        { AttributeName: "year", AttributeType: "N" },
        { AttributeName: "title", AttributeType: "S" }
    ],
    ProvisionedThroughput: {       
        ReadCapacityUnits: 10, 
        WriteCapacityUnits: 10
    }
};

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

function guid() {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
      s4() + '-' + s4() + s4() + s4();
  }

function listTables() {
    db.listTables(function(err, data) {
        if(!err) {
            console.log(data.TableNames);
        } else {
            console.log(err);
        }
    });
};