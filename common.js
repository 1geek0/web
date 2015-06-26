AWS.config.credentials = new AWS.CognitoIdentityCredentials({
	IdentityPoolId : 'us-east-1:08e41de7-9cb0-40d6-9f04-6f8956ed25b'
});

AWS.config.region = 'us-east-1';

var db = AWS.DynamoDB({region : 'us-east-1'});
AWS.config.db = {region : 'us-east-1'};
db.listTables(function (err, data) {
    console.log(data.TableNames);
});
