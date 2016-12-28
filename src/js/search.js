require([
    "common"
], function () {

    var common = require("common");

    function configureMap(list) {
        var center = {
            lat: 0,
            lng: 0
        };

        var minLat = 5000, maxLat = -5000, minLng = 5000, maxLng = -5000;

        // Create a map object and specify the DOM element for display.
        var map = new google.maps.Map(document.getElementById("map"), {
            center: center,
            scrollwheel: false,
            zoom: 15
        });

        for (var i=0;i<list.stores.length;i++) {
            var store = list.stores[i];

            // Create a marker and set its position.
            var marker = new google.maps.Marker({
                map: map,
                position: store.latLng,
                title: store.name
            });

            minLat = Math.min(minLat, store.latLng.lat);
            maxLat = Math.max(maxLat, store.latLng.lat);
            minLng = Math.min(minLng, store.latLng.lng);
            maxLng = Math.max(maxLng, store.latLng.lng);

            console.log(marker);
        }

        center = {
            lat: (maxLat + minLat) / 2,
            lng: (maxLng + minLng) / 2
        };

        var zoom = common.getBestZoom(minLat, maxLat, minLng, maxLng,
            $("#map").width(), $("#map").height(), 18);

        map.panTo(center);
        map.setZoom(zoom);
    }

    function initMap(list) {
        require(["async!https://maps.googleapis.com/maps/api/js?key=" +
        "AIzaSyAHX_Y_cP2i1v9lchEPJ4yROwzh9nK6of0"], function() {
            configureMap(list);
        });
    }

    var tempList = {
        "stores": [{
            "name": "본앤브레드",
            "latLng": {
                "lat": 37.570392,
                "lng": 127.041688
            }
        }, {
            "name": "갑이다짬뽕",
            "latLng": {
                "lat": 37.5573377,
                "lng": 126.935609
            }
        }]
    };

    initMap(tempList);

    common.initHotPlaces();
});
