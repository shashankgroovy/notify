var express = require("express");
var router = express.Router();

var notification_list = "notifications";

/*  "/notifications/"
 *    GET: show all notification
 *    POST: create new notification
 */

router.route("/notifications")
    .get(function(req, res) {
        req.db.collection(notification_list).find({}).toArray(function(err, docs) {
            if (err) {
                handleError(res, err.message, "Failed to get notifications.");
            } else {
                res.status(200).json(docs);
            }
        });
    })

    .post(function(req, res) {
        var newNotification = req.body;
        newNotification.createDate = new Date();

        if (!(req.body.user && req.body.action)) {
            handleError(res, "Invalid input", "Must provide a user and action", 400);
        }

        req.db.collection(notification_list).insertOne(newNotification, function(err, doc) {
            if (err) {
                handleError(res, err.message, "Failed to create new notification.");
            } else {
                res.status(201).json(doc.ops[0]);
            }
        });
    });

/*  "/notifications/:id"
 *    GET: find notification by id
 *    PUT: update notification by id
 *    DELETE: deletes notification by id
 */

router.route("/notifications/:id")
    .get(function(req, res) {
        req.db.collection(notification_list).findOne({ _id: new ObjectID(req.params.id) }, function(err, doc) {
            if (err) {
            handleError(res, err.message, "Failed to get notification");
            } else {
            res.status(200).json(doc);
            }
        });
    })
    .put(function(req, res) {
        var updateDoc = req.body;
        delete updateDoc._id;

        req.db.collection(notification_list).updateOne(
            {_id: new ObjectID(req.params.id)},
            updateDoc,
            function(err, doc) {
                if (err) {
                    handleError(res, err.message, "Failed to update notification");
                } else {
                    res.status(204).end();
                }
            });
    })
    .delete(function(req, res) {
        req.db.collection(notification_list).deleteOne({_id: new ObjectID(req.params.id)}, function(err, result) {
            if (err) {
                handleError(res, err.message, "Failed to delete notification");
            } else {
                res.status(204).end();
            }
        });
    });


// More routes that effect the CRUD

/*  "/createnoti/"
 *    GET: returns a new random notification
 */

router.route("/createnoti")
    .get(function(req, res) {
        req.db.collection(notification_list)
            .find( { read_status: "0" })
            .toArray(function(err, docs) {
                if (err) {
                    handleError(res, err.message, "Failed to get notifications.");
                } else {
                    res.status(200).json(docs);
                }
        })
    });

/*  "/getunread/"
 *    GET: returns a list of all the unread notifications
 */

router.route("/getunread")
    .get(function(req, res) {
        req.db.collection(notification_list)
            .find( { read_status: "0" })
            .toArray(function(err, docs) {
                if (err) {
                    handleError(res, err.message, "Failed to get notifications.");
                } else {
                    res.status(200).json(docs);
                }
        })
    });

/*  "/markAllRead/"
 *    PUT: marks all unread notification as read
 */

router.route("/markallread")
    .put(function(req, res) {
        req.db.collection(notification_list)
            .update(
                { read_status: "0" },
                { $set: { read_status: "1"} },
                { multi: true },
                function(err, docs) {
                    if (err) {
                        handleError(res, err.message, "Failed to get notifications.");
                    } else {
                        res.status(200).json(docs);
                    }
                })
    });



// Generic error handler used by all endpoints.
function handleError(res, reason, message, code) {
  console.log("ERROR: " + reason);
  res.status(code || 500).json({"error": message});
}


module.exports = router;
