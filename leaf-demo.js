// See post: http://asmaloney.com/2014/01/code/creating-an-interactive-map-with-leaflet-and-openstreetmap/

var map = L.map( 'map', {
    center: [19.93777, 73.5947],
    minZoom: 2,
    zoom: 12
});

L.tileLayer( 'http://{s}.mqcdn.com/tiles/1.0.0/map/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright" title="OpenStreetMap" target="_blank">OpenStreetMap</a> contributors | Tiles Courtesy of <a href="http://www.mapquest.com/" title="MapQuest" target="_blank">MapQuest</a> <img src="http://developer.mapquest.com/content/osm/mq_logo.png" width="16" height="16">',
    subdomains: ['otile1','otile2','otile3','otile4']
}).addTo( map );

var myURL = jQuery( 'script[src$="leaf-demo.js"]' ).attr( 'src' ).replace( 'leaf-demo.js', '' );

//var interval = setInterval(function () {getLast()}, 1000);

var cred = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: 'us-east-1:08e41de7-9cb0-40d6-9f04-6f8956ed25bb',
    });
    AWS.config.credentials = cred;
    AWS.config.region = 'us-east-1';
    var db = new AWS.DynamoDB();
    

function getLast(){
        var marams = {
            TableName : 'test_gate1',
            IndexName : 'Plotted-n-index',
            KeyConditions :
            {
                "Plotted" :
                {
                    "AttributeValueList" : [
                        {
                            "N" : '1'
                        }
                    ],
                    "ComparisonOperator" : "EQ"
                }
            },
            ScanIndexForward : false
        }
        
        db.query(marams, function(err, data){
            if(err) console.log(err, err.stack);
            else{
                inCnt = data.Items[0].In.N;
                console.log(inCnt);
            }
        });
    mapFunc();
    }

    
mapFunc = function(){
    for(var i=0; i < markers.length ; i++){
        markers[i].cnt = inCnt;
    }
    for ( var i=0; i < markers.length; ++i ) 
    {
        markers[i].cnt = inCnt;
       L.marker( [markers[i].lat, markers[i].lng], {icon: myIcon} )
          .bindPopup( '<a href="' + markers[i].url + '" target="_blank">' + markers[i].name + '</a>' + '<p>' + markers[i].cnt + '</p>' )
          .addTo( map );
    }
}

var myIcon = L.icon({
    iconUrl: myURL + 'images/pin24.png',
    iconRetinaUrl: myURL + 'images/pin48.png',
    iconSize: [29, 24],
    iconAnchor: [9, 21],
    popupAnchor: [0, -14]
});

