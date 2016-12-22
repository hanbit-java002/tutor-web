define([
    "bootstrap"
], function () {
    $("#main-logo").on("click", function() {
        location.href = "/";
    });

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

    function getBestZoom(minLat, maxLat, minLng, maxLng,
                         centerLat, centerLng, mapWidth, mapHeight) {
        var radius = 6371; // radius of the earth in km
        var oneRadian = 57.2958; // one radian
        var interval = 0;

        if ((maxLat - minLat) > (maxLng - minLng)) {
            interval = (maxLat - minLat) / 2;
            minLat -= interval;
            maxLat += interval;
        } else {
            interval = (maxLng - minLng) / 2;
            minLng -= interval;
            maxLng += interval;
        }

        var dist = (radius * Math.acos(Math.sin(minLat / oneRadian) *
            Math.sin(maxLat / oneRadian) + (Math.cos(minLat / oneRadian) *
            Math.cos(maxLat / oneRadian) *
            Math.cos((maxLng / oneRadian) - (minLng / oneRadian)))));

        return Math.floor(8 -
            Math.log(1.6446 * dist / Math.sqrt(2 * (mapWidth * mapHeight))) /
            Math.log (2));
    }

    return {
        initHotPlaces: initHotPlaces,
        getBestZoom: getBestZoom
    };
});
