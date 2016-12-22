define([
    "bootstrap",
    "animation"
], function () {
    function search() {
        location.href = "search.html";
    }

    $("#main-logo").on("click", function() {
        location.href = "/";
    });

    $("#main-search").on("keyup", function(event) {
        if (event.keyCode === 13) {
            search();
        }
        else if (event.keyCode === 27) {
            $(this).val("");
        }
    });

    $("#main-search-btn").on("click", function() {
        search();
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

        if (!maxZoom) {
            maxZoom = 21;
        }

        return Math.min(zoom, maxZoom);
    }

    return {
        initHotPlaces: initHotPlaces,
        getBestZoom: getBestZoom
    };
});
