var express = require('express'),
    app = express(),
    http = require('http'),
    path = require('path'),
    server = require('http').Server(app),
    stdio = require('stdio'),
    asyncd = require('async'),
	  MongoClient = require('mongodb').MongoClient,
    assert = require('assert');

<<<<<<< HEAD
var mongoUri = 'mongodb://b:b@ds041633.mongolab.com:41633/second'

// Connection URL
var url = 'mongodb://b:b@ds035674.mongolab.com:35674/byte-buccaneers';
// Use connect method to connect to the Server
MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  console.log("Connected correctly to server");
  findDocuments(db,function(d){
    console.log(d);
  });
});


var findDocuments = function(db, callback) {
  // Get the documents collection
  var collection = db.collection('documents');
  // Find some documents
  collection.find({}).toArray(function(err, docs) {
    console.log("Found the following records");
    console.dir(docs);
    callback(docs);
  });
}


//App Configuration
=======
>>>>>>> origin/master
app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));

app.get('/', function(request, response) {
  response.render('index.html');
});

<<<<<<< HEAD
//
// app.get('/create', function(request, response){
//   q = request.query;
//   db.users.findAndModify({
//     query:{userID: q.userID,
//            website: q.website},
//     update:{
//     $setOnInsert: {user: q.user,
//                    password: q.password,
//                    website: q.website,
//                    userID: q.userID}
//     },
//     new: true,
//     upsert: true // insert the document if it does not exist
//   },function (err, doc, lastErrorObject) {
//     // doc.tag === 'maintainer'
//   })
//
//   response.json(request.query);
// })
//
// app.get('/read/:number/:name/', function(request, response){
// 	//request.params.name/number/whatever
// 	var usernumber = request.params.number;
// 	db.users.find({},function(err, docs) {
// 		console.log(err);
// 		console.log(docs);
// 	});
// 	/*
// 	var labs_res =
// 	db.users.find(
// 		{"number":usernumber},
// 		function(err,docs){
// 			console.log(docs);
// 			response.send(docs);
// 		}
// 	);
// 	*/
// 	/*
// 	db.users.find({phonenumber: usernumber},function(err, docs){
//      console.log(docs);
//      response.json(docs);
//     })*/
// })
//
// app.get('/update', function(request,response){
//   q = request.query;
//   db.users.update({userID : q.userID, website: q.website},
//                   {$set: {password: q.password}},
//                   function(err, docs){
//     response.json(docs);
//   })
// })
//
//
// app.get('/api/test', function(request, response){
//     var q = request.query;
//     console.log(q);
// });

=======
>>>>>>> origin/master

server.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
