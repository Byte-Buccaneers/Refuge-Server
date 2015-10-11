var express = require('express'),
    app = express(),
    http = require('http'),
    path = require('path'),
    server = require('http').Server(app),
    stdio = require('stdio'),
    asyncd = require('async'),
	  MongoClient = require('mongodb').MongoClient,
    assert = require('assert');

//Global variable defined in MongoClient.connect
var dbglobal = "";
var users = "";
var groups = "";
// Connection URL
var url = 'mongodb://b:b@ds035674.mongolab.com:35674/byte-buccaneers';

// Use connect method to connect to the Server
MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  console.log("Connected correctly to server <3");
  dbglobal = db;
  users = dbglobal.collection('users');
  groups = dbglobal.collection('groups');
  
});

//App Configuration
app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));

app.get('/', function(request, response) {
  response.render('index.html');
});

app.get('/testme',function(request,response){
	var found = users.find().toArray(function(err,docs){
		console.log(docs);
		response.send(docs);
	});
});

function createGeoPair(long1,long2,lat1,lat2){
	var longS = long1+ '.' +long2;
	var latS  = lat1 + '.' +lat2;
	return [longS,latS];
}
//DB CREATE OPERATIONS
app.get('/createuser/:number/:name',function(request,response){
	//requests.params.number/name
	var new_name = request.params.name;
	var new_number = request.params.number;
	users.insert(
		{
			"name"	: new_name,
			"number": new_number,
			"loc"	: null
		},
		function(err,doc){
			if(err == null)
				response.send("1");
			else//to err is human
				response.send("0");
	});
});

app.get('/creategroup/:owner/:long1/:long2/:lat1/:lat2',function(request,response){
	var p = request.params;
	var pair = createGeoPair(p.long1,p.long2,p.lat1,p.lat2);
	groups.insert(
		{
			"owner"			: request.params.owner,
			"destination"	: pair
		},
		function(err,doc){
			if(err == null)
				response.send("1");
			else
				response.send("0");
		}
	)
});

//DB UPDATE OPERATIONS
app.get('/updateuser/:number/:long1/:long2/:lat1/:lat2',function(request,response){
	var p = request.params;
	var pair = createGeoPair(p.long1 , p.long2 , p.lat1 , p.lat2);
	
	users.update(
		{"number":p.number},
		{"loc" : pair },
		function(err,doc){
			if(err == null)
				response.send("1");
			else
				response.send("0");
		}
	);
});

server.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
