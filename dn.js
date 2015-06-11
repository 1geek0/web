// See the Configuring section to configure credentials in the SDK
    AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: 'us-east-1:d3068c0b-aa3b-401f-99f2-fdf6bf841609',
});
    var db = new AWS.DynamoDB();
    db.listTables(function(err, data) {
    	var table = document.createElement("table");
    	table.style.border="1px solid black";	
    	
    		var i = 0;
    		for(var r = 0; r < data.TableNames.length; r++){
    			var row = table.insertRow(r);
    			row.style.border = "1px solid black";
    			
    			for(var c = 0; c < 1; c++){
    				var cell = row.insertCell(c);
    				cell.style.border = "1px solid black";
    				cell.appendChild(document.createTextNode(data.TableNames[i++]));
    			}
    		}
    		document.body.appendChild(table);
/*
    	for(var i = 0; i < data.TableNames.length; i++){
    		var d = data.TableNames;
    		var row = table.insertRow(i);
    		var cell = row.insertCell(i);
    		cell.innerHTML = d[i];
        	console.log(data.TableNames[i]);
        	*/
       
    });
    var dbTable = new AWS.DynamoDB({params: {TableName: 'Ashioto_test'}});