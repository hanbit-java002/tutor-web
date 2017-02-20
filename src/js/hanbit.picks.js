require([
    "common"
], function () {

    var common = require("common");

    $("#calc").on("click", function() {
        $.ajax({
            url: window._ctx.root + "/api2/calc",
            method: "GET",
            data: {
                left: $("#leftNum").val(),
                right: $("#rightNum").val(),
                operator: $("#op").val()
            },
            success: function(data) {
                var result = data.result;
                $("#result").text(result);
            }
        });
    });

    common.initHotPlaces();
});
