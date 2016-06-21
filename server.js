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

/* set the MONGODB_URI relative to environment
 *
 * make sure you set NODE_ENV as your environment variable
 * development: `export NODE_ENV='development'`
 .* production: `export NODE_ENV='production'`
 *
 * successively,
 * use `npm run dev` to start server with development config
 * and `npm start` to start server with production config
 */
if (process.env.NODE_ENV == "production")
    MONGODB_URI = 'mongodb://notify:test@ds021034.mlab.com:21034/notify';
else
    MONGODB_URI = 'mongodb://localhost:27017/test';

/* Create the database variable and collection variable as global variable so
 * that it can be accessed in all files.
 */
db = null;
notification_collection = "notifications";

/*
 * When deploying to production environments like Heroku and using the mongolab
 * extension, set the mongo connection uri using the `process.env.MONGODB_URI`
 * Like this:
 *   mongodb.MongoClient.connect(
 *      process.env.MONGODB_URI,
 *      function (err, database) {
 *
 *       // your code goes here
 *   }
 */
mongodb.MongoClient.connect(MONGODB_URI, function (err, database) {
    if (err) {
        console.log(err);
        process.exit(1);
    }

    // Save database object from the callback for reuse.
    db = database;
    console.log("Database connected");

    /*
     * Initialize the app.
     * This way we ensure that the app doesn't run when not connected to the
     * database
     */
    var server = app.listen(process.env.PORT || 8000, function () {
        var port = server.address().port;
        console.log("App now running on port", port);
    });
});

/* Attach db to request object to access it in routes
 * but then db won't be accessible in controllers. Hence db is set as global
 *
 *   app.use(function(req,res,next){
 *       req.db = db;
 *       next();
 *   });
 */

/* Routes
 *
 * set the API routes available at "api/v1/*"
 */
var api = require('./routes');
app.use('/api/v1/', api);

app.get('*', function(req, res) {
    res.sendFile(__dirname + '/public/index.html');
});
