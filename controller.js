// Various controller functions

ARTISTS = [
    {
        "name": "Arctic Monkeys",
        "image": "arcticmonkeys.jpg"
    },
    {
        "name": "Guns N roses",
        "image": "gunsnroses.jpg"
    },
    {
        "name": "Muse",
        "image": "muse.jpg"
    },
    {
        "name": "Pink Floyd",
        "image": "pinkfloyd.jpg"
    },
    {
        "name": "Porcupine Tree",
        "image": "porcupinetree.jpg"
    },
    {
        "name": "Radiohead",
        "image": "radiohead.png"
    },
    {
        "name": "The Beatles",
        "image": "beatles.jpg"
    }
]


ACTIONS = [
    "liked your post",
    "posted 2 comments on your post",
    "posted a photo on your wall",
    "liked your photo",
    "tagged you in a photo",
    "liked your last video",
    "shared your video",
    "loved your song",
    "listened to your song"

]

/**
 * Helper function that returns a random integer in a given range.
 * useful in getRandomArtist() and getRandomAction() functions.
 */
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Returns a random artist from a list of `ARTISTS`
 */
function getRandomArtist() {
    return ARTISTS[getRandomInt(ARTISTS.length, 1)];
}

/**
 * Returns a random action from a list of `ACTIONS`
 */
function getRandomAction() {
    return ACTIONS[getRandomInt(ACTIONS.length, 1)];
}

/**
 * Create a new notification object and returns it
 * @constructor
 *  {
 *      id : Object_id,
 *      action: action,
 *      createDate: Date object,
 *      image: artist image,
 *      read_status: 0 (default 0 is unread)
 *      user: artist name
 *  }
 */
function createNewNotification() {

    artist = getRandomArtist();
    action = getRandomAction();
    date = new Date();

    newNotification = {
        action: action,
        createDate: date,
        image: artist.image,
        read_status: 0,
        user: artist.name
    }

    return newNotification;
}



/**
 * Fetch all notifications
 */
exports.getAllNotifications = function getAllNotifications(cb) {

    db.collection(notification_collection)
    .find({})
    .sort({createDate: -1})
    .toArray(function(err, docs) {
        if (err) {
            cb(err,docs);
        } else {
            cb(err,docs);
        }
    });
}

/**
 * A function that generates random number of new notifications within the
 * range 1 to 10
 */
exports.generateNotifications = function generateNotifications(cb) {

    var notification_list = [];

    var maxlimit = 10;
    var random_count = getRandomInt(maxlimit, 1);

    for (i=0; i<random_count; i++) {
        newNotification = createNewNotification();
        notification_list.push(newNotification);
    }

    // set notifications in db
    db.collection(notification_collection)
        .insert(notification_list, function(err, docs) {
            if (err) {
                cb(err,docs);
            } else {
                cb(err,docs);
            }
        });
}

/**
 * get unread notifications
 */
exports.getUnread = function getUnread(cb) {

    db.collection(notification_collection)
    .find({read_status : 0})
    .toArray(function(err, docs) {
        if (err) {
            cb(err,docs);
        } else {
            cb(err,docs);
        }
    });
}
/**
 * Marks all unread notification as read
 */
exports.markAllRead = function markAllRead(cb) {

    db.collection(notification_collection)
        .update(
            { read_status: 0 },
            { $set: { read_status: 1} },
            { multi: true },
            function(err, docs) {
                if (err) {
                    cb(err, docs);
                } else {
                    cb(err, docs);
                }
            }
        )
}

/**
 * Deletes all notifications from the db collection but doesn't drop the collection
 */
exports.deleteAllNotifications = function deleteAllNotifications(cb) {

    db.collection(notification_collection)
        .deleteMany({}, function(err, result) {
            if (err) {
                cb(err, result);
            } else {
                cb(err, result);
            }
        })
}
