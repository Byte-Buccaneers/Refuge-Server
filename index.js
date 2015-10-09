var express = require('express'),
    app = express(),
    http = require('http'),
    path = require('path'),
    server = require('http').Server(app),
    stdio = require('stdio'),
    asyncd = require('async');

var mongojs = require('mongojs');
var mongoUri = 'mongodb://user:user@ds031477.mongolab.com:31477/hackathons';
var db = mongojs(mongoUri, ['users','destinations']);


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
  var matchedCol = {};
  console.log(unauthed);
  var count = 0;
  var retVal;
  console.log("before whilst")
  asyncd.whilst(
    function(){ f = (count < 600 && unauthed); return f},
    function(callback) {
      console.log("in Callback")
      count++;
      setTimeout(callback, 100);
      },
      function(err){
        retVal = "false";
        console.log(unauthed);
        if(!unauthed){
          db.users.find({userID : q.userID, website: q.website}, function(err, docs){
            retVal = docs;
            unauthed = true;
            response.json(retVal);
            return 0;
          });
        }
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
