require([
    "common",
    "vertx-eventbus",
], function() {
    var EventBus = require("vertx-eventbus");
    var eb = new EventBus("/api/eventbus");

    eb.onopen = function() {
        eb.registerHandler("hanbit.client", function(error, message) {
            $(".msg-box").append("<div class='msg-ip'>" + message.body.ip +
                "</div><div>" + message.body.text + "</div>");
            $(".msg-box").scrollTop($(".msg-box")[0].scrollHeight);
        });
    };

    $(".msg-input").on("keyup", function(event) {
        if (event.keyCode !== 13) {
            return;
        }

        eb.send("hanbit.server", {
            name: "hanbit",
            text: $(this).val(),
        });

        $(this).val("");
    });
});