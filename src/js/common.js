define([
    "bootstrap"
], function () {
    function addHotPlaces(hotPlaces) {
        for (var i=0;i<hotPlaces.length;i++) {
            $("#footer-location>ul").append("<li>" + hotPlaces[i] + "</li>");
        }
    }

    function initHotPlaces() {
        $.ajax({
            url: "/api/common/hotplaces",
            success: function(hotPlaces) {
                addHotPlaces(hotPlaces);
            }
        });
    }

    return {
        initHotPlaces: initHotPlaces
    };
});
