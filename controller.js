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
 * A function that generates random number of new notifications within the
 * range 1 to 10
 */
function generateNotifications() {
    var maxlimit = 10;
    var random_count = getRandomInt(maxlimit, 1);

    for (i=0; i<=maxlimit; i++) {
        createNewNotification()
    }
}
