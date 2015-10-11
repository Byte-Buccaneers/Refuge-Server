var express = require('express'),
    app = express(),
    http = require('http'),
    path = require('path'),
    server = require('http').Server(app),
    stdio = require('stdio'),
    asyncd = require('async');

var cradle = require('cradle');
var couchUri = 'https://khe2015.iriscouch.com/';
var connection = new(cradle.Connection)(couchUri, 5984, {
    cache: true,
    raw: false,
    forceSave: true
});
var dbPeople = new(connection.database('people');
var dbGroup = new(connection.database('groups'))

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));

app.get('/', function(request, response) {
  response.render('index.html');
});

app.get('/create', function(request, response){
  q = request.query;
  db.users.findAndModify({
    query:{userID: q.userID,
           website: q.website},
    update:{
    $setOnInsert: {user: q.user,
                   password: q.password,
                   website: q.website,
                   userID: q.userID}
    },
    new: true,
    upsert: true // insert the document if it does not exist
  },function (err, doc, lastErrorObject) {
    // doc.tag === 'maintainer'
  })

  response.json(request.query);
})

app.get('/read', function(request, response){
    q = request.query;
    var retVal = "none";
    db.users.find({phonenumber: "5556667777"},function(err, docs){
      console.log(docs);
      response.json(docs);
    })
})

app.get('/update', function(request,response){
  q = request.query;
  db.users.update({userID : q.userID, website: q.website},
                  {$set: {password: q.password}},
                  function(err, docs){
    response.json(docs);
  })
})


app.get('/api/test', function(request, response){
    var q = request.query;
    console.log(q);
});


server.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
