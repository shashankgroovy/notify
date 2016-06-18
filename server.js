var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
var url = require('url');

var mongodb = require("mongodb");
ObjectID = mongodb.ObjectID;

// Instantiate the app
var app = express();
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());


/* Database setup
 *
 * establish database conncetion
 * expose `db` variable to global scope
 *
 */

MONGODB_URI = 'mongodb://localhost:27017/test';

// Create a database variable
var db;
//mongodb.MongoClient.connect(process.env.MONGODB_URI, function (err, database) {
mongodb.MongoClient.connect(MONGODB_URI, function (err, database) {
  if (err) {
    console.log(err);
    process.exit(1);
  }

  // Save database object from the callback for reuse.
  db = database;
  console.log("Database connected");

  // Initialize the app.
  var server = app.listen(process.env.PORT || 8080, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
  });
});

// Attach db to request object
app.use(function(req,res,next){
    req.db = db;
    next();
});


/* Routes
 * set the API routes available
 * "api/v1/*"
 */
var api = require('./routes');
app.use('/api/v1/', api);

app.get('/',function(req, res) {
    var baseUrl = (req.headers.protocol || "http")+ "://" + req.headers.host;
    var apiUrl = baseUrl + "/api/v1/"
    msg = {
        "links": {
            "api": apiUrl,
            "website": baseUrl
        }
    }
    res.status(200).json(msg)
})
