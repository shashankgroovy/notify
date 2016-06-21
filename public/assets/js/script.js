var notificationList = [];
var unreadCount = 0;
var dropdownVisible = false;

// frequently used DOM elements
var noti_box = document.querySelector("#noti-box");
var noti_counter = document.querySelector('#noti-counter');
var noti_big_counter = document.querySelector('#noti-big-counter');

var button = document.querySelector('#go');

//var noti-container = document.querySelector("noti-container");
// NOTE: Need the jquery selector for fade in/out animation only
var noti_container = $("#noti-container");


// Begin all onclick operations when the DOM has loaded

window.onload = function() {

    /*
     * Close dropdown on click event of document
     */
    document.onclick = function(event) {
        if(dropdownVisible)
            if(!noti_container.is(event.target) &&
                noti_container.has(event.target).length == 0)
            noti_container.fadeOut();
    }

    /*
     * Open/close dropdown on click event of notification icon
     * Marks all notifications in the dropdown as read.
     */
    noti_box.onclick = function(event) {
        if(dropdownVisible) {
            //hide dropdown
            noti_container.fadeOut();
            dropdownVisible = false;
        } else {
            //show dropdown
            noti_container.fadeIn();
            dropdownVisible = true;

            if(unreadCount != 0 && notificationList.length != 0) {

                // only run the function when unreadCount is not zero
                // prevents multiple Http requests.

                markAllRead(function(result) {

                    // change the notification counters to 0 slowly so that the
                    // change is visible.

                    setTimeout(function() {
                        unreadCount = 0;
                        noti_counter.textContent = unreadCount;
                        noti_big_counter.textContent = unreadCount;
                        scaleNotiCounter();
                    }, 600)
                });
            }
        }
        // prevent click event to propagte to respective parent DOM elements
        event.stopPropagation();
    };

    /*
     * Generate random number of notifications at regular Intervals
     */
    button.onclick = function() {
        fetchNotifications(function(result) {
            // populate the array
            notificationList = result;

            /*
             * check if notification array is empty else
             * generate the template for all the objects in the array
             */
            if(notificationList.length != 0) {

                notificationList.forEach(function(item) {
                    setTimeout(function() {
                        unreadCount += 1;
                        // bring out the visual element
                        // scale the notification counter icon
                        scaleNotiCounter();

                        noti_counter.textContent = unreadCount;
                        noti_big_counter.textContent = unreadCount;

                        // generate the necessary template for all items
                        fillTemplate(item);
                    }, 1000)
                })
            }
        });
    };
};


/*
 * Animate the notification counter badge
 */
function scaleNotiCounter() {
    if (unreadCount > 0) {
        noti_counter.style.transform = "scale(1)";
    } else {
        // remove the badge after 4 seconds
        setTimeout(function() {
            noti_counter.style.transform = "scale(0)";
        }, 4000);
    }
}

/*
 * This is where the templating magic happens
 * Uses the html5 <template> tag to create new elements and prepend to
 * notificationList array
 */
function fillTemplate(item) {

    // proceed only if templating is available

    if ('content' in document.createElement('template')) {

        image_base_url = '/assets/images/'

        // Instantiate the ul with the existing HTML
        var t = document.querySelector('#litemplate');
        var span = t.content.querySelectorAll("span");
        span[0].textContent = item.user;
        span[1].textContent = item.action;

        var im = t.content.querySelector('img');
        im.setAttribute('src', image_base_url+item.image);

        // Clone the new list template and insert it into the ul
        var ul = document.getElementsByTagName("ul");
        var clone = document.importNode(t.content, true);

        //prepend the new notifications on top
        ul[0].insertBefore(clone, ul.firstChild);


    } else {
        /**
         * Html5 templating works in all Modern browsers
         * Phew! so glad templating works else I might have had to use a
         * templating engine
        */
    }
}


/**
 * Get all notifications and populate the notificationList array
 */
function fetchNotifications(callback) {

    // Make an ajax call to fetch all notifications
    var req = new XMLHttpRequest();
    req.onreadystatechange = function()
    {
        if (req.readyState == 4 && req.status == 200)
        {
            // return the response object via the callback
            // JSON.parse is essential to convert string type response to
            // proper json. Since responseText is a string and we need JSON.
            callback(JSON.parse(req.responseText));
        }
    };

    // create new notifications or bring out the old ones
    if (unreadCount == 0 && notificationList.length > 0) {
        req.open('GET', "api/v1/createnotifications");
        req.send();
    } else {
        req.open('GET', "api/v1/notifications");
        req.send();
    }
}

/**
 * Mark all notifications in the dropdown menu as read
 * sets read_status = 1
 */
function markAllRead(callback) {
    // make an ajax call to mark all notifications as read

    var req = new XMLHttpRequest();
    req.onreadystatechange = function()
    {
        if (req.readyState == 4 && req.status == 204)
        {
            // return the response object via the callback
            callback(req.responseText);
        }
    };
    req.open('PUT', "api/v1/markallread");
    req.send();
}
