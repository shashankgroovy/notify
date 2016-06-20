var controller = require("./controller");
var express = require("express");
var router = express.Router();


/*  "/notifications/"
 *    GET: show all notification
 *    POST: create new notification
 */

router.route("/notifications")
    .get(function(req, res) {
        controller.getAllNotifications(function(err, docs) {
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

        db.collection(notification_collection).insertOne(newNotification, function(err, doc) {
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
 *
 *    TODO: Do all operations via the controller but since we are dealing with
 *    just one notification so maybe its a fair trade.
 *    Else retweak the controller functions to accept request objects parameters
 */

router.route("/notifications/:id")
    .get(function(req, res) {
        db.collection(notification_collection)
        .findOne({ _id: new ObjectID(req.params.id) }, function(err, doc) {
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

        db.collection(notification_collection)
            .updateOne( {_id: new ObjectID(req.params.id)}, updateDoc, function(err, doc) {
                if (err) {
                    handleError(res, err.message, "Failed to update notification");
                } else {
                    res.status(204).end();
                }
            });
    })
    .delete(function(req, res) {
        db.collection(notification_collection)
        .deleteOne({_id: new ObjectID(req.params.id)}, function(err, result) {
            if (err) {
                handleError(res, err.message, "Failed to delete notification");
            } else {
                res.status(204).end();
            }
        });
    });


// Routes that don't follow the exact rest pattern but uses rest

/*  "/createnotifications/"
 *    GET: returns a random number of newly created notifications
 */

router.route("/createnotifications")
    .get(function(req, res) {
        controller.generateNotifications(function(err, docs) {
            if (err) {
                handleError(res, err.message, "Failed to create notifications.");
            } else {
                res.status(200).json(docs.ops);
            }
        })
    });


/*  "/markAllRead/"
 *    PUT: marks all unread notification as read
 */

router.route("/markallread")
    .put(function(req, res) {
        controller.markAllRead(function(err, docs) {
            if (err) {
                handleError(res, err.message, "Failed to update all notifications");
            } else {
                res.status(204).end();
            }
        })
    });

/*  "/deleteall/"
 *    DELETE: clears all notifications
 */
router.route("/deleteall")
    .delete(function(req, res) {
        controller.deleteAllNotifications(function(err, result) {
            if (err) {
                handleError(res, err.message, "Failed to delete notification");
            } else {
                res.status(204).end();
            }
        })
    });

// Generic error handler used by all endpoints.
function handleError(res, reason, message, code) {
  console.log("ERROR: " + reason);
  res.status(code || 500).json({"error": message});
}


module.exports = router;
