var notificationList = [];
var notiCount = 0;

var noti_box = document.querySelector("#noti-box");
//var noti-container = document.querySelector("noti-container");
var noti_container = $("#noti-container");
var noti_counter = document.querySelector('#noti-counter');
var noti_big_counter = document.querySelector('#noti-big-counter');

var button = document.querySelector('#go');


window.onload = function() {
    noti_box.onclick = function() {
        noti_container.fadeToggle("slow");

        if(notiCount != 0 && notificationList.lenth != 0) {

            // only run the function when noti_counter is 0
            // prevents multiple Http requests.

            markAllRead(function(result) {

                // change the notification counters to 0 slowly so that the
                // change is visible.

                setTimeout(function() {
                    notiCount = 0;
                    noti_counter.textContent = notiCount;
                    noti_big_counter.textContent = notiCount;
                    scaleNotiCounter();
                }, 600)
            });

        }
    };
    button.onclick = function() {
        fetchNotifications(function(result) {
            // set values
            notificationList = result;

            if(notificationList.length != 0) {

                notificationList.forEach(function(item) {
                    setTimeout(function() {
                        notiCount += 1;
                        // bring out the visual element
                        // scale the notification counter icon
                        scaleNotiCounter();

                        noti_counter.textContent = notiCount;
                        noti_big_counter.textContent = notiCount;

                        // generate the necessary template for all items
                        fillTemplate(item);
                    }, 1000)
                })
            }
        });
    };
};


function scaleNotiCounter() {
    if (notiCount > 0) {
        noti_counter.style.transform = "scale(1)";
    } else {
        setTimeout(function() {
            noti_counter.style.transform = "scale(0)";
        }, 2000);
    }
}
function fillTemplate(item) {

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
         * So glad templating works else I might have had to use a
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
            // JSON.parse is essential to convert string type response to proper json.
            // since responseText is a string and we need JSON.
            callback(JSON.parse(req.responseText)); // Another callback here
        }
    };
    req.open('GET', "api/v1/notifications");
    req.send();
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
            console.log(req.responseText)
            callback(req.responseText);
        }
    };
    req.open('PUT', "api/v1/markallread");
    req.send();
}
