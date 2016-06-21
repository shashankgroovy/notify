var notification_list = [];
var noti_counter = 0;

var noti_box = document.querySelector("#noti-box");
//var noti-container = document.querySelector("noti-container");
var noti_container = $("#noti-container");
var noti_counter = document.querySelector('#noti-counter');
var noti_big_counter = document.querySelector('#noti-big-counter');

var button = document.querySelector('#go');


$(document).ready(function(){
    noti_box.onclick = function() {
        noti_container.fadeToggle("slow");
    };
    button.onclick = function() {
        fetchNotifications(function(result) {
            // set values
            notification_list = result;
            count = notification_list.length;

            noti_counter.textContent = count;
            noti_big_counter.textContent = count;

            // generate the necessary template for all items
            notification_list.forEach(function(item) {
                setTimeout(function() {
                    fillTemplate(item);
                }, 1000)
            })
        });
    };
});


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
        ul[0].appendChild(clone);


    } else {
        /**
         * Html5 templating works in all Modern browsers
         * So glad templating works else I might have had to use a
         * templating engine
        */
    }
}
/**
 * Get all notifications and populate the notification_list array
 */
function fetchNotifications(cb) {
    // Make an ajax call to fetch all notifications
    $.ajax({
        url: "api/v1/notifications",
        type: 'get',
        success: function(data){
            cb(data);
        }
    });
}
