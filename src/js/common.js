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

    function getBestZoom(minLat, maxLat, minLng, maxLng, mapWidth, mapHeight, maxZoom) {
        var radius = 6371; // radius of the earth in km
        var oneRadian = 57.2958; // one radian
        var interval = 0;

        if ((maxLat - minLat) > (maxLng - minLng)) {
            interval = (maxLat - minLat) / 2;
        } else {
            interval = (maxLng - minLng) / 2;
        }

        minLat -= interval;
        maxLat += interval;
        minLng -= interval;
        maxLng += interval;

        var dist = (radius * Math.acos(Math.sin(minLat / oneRadian) *
            Math.sin(maxLat / oneRadian) + (Math.cos(minLat / oneRadian) *
            Math.cos(maxLat / oneRadian) *
            Math.cos((maxLng / oneRadian) - (minLng / oneRadian)))));

        var zoom = Math.floor(8 -
            Math.log(1.6446 * dist / Math.sqrt(2 * (mapWidth * mapHeight))) /
            Math.log (2));

        if (maxZoom) {
            return Math.min(zoom, maxZoom);
        }

        return zoom;
    }

    return {
        initHotPlaces: initHotPlaces,
        getBestZoom: getBestZoom
    };
});
