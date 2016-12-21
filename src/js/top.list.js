require([
    "common",
    "clipboard"
], function () {

    var common = require("common");
    var Clipboard = require("clipboard");

    function addItems(items, sectionCode) {
        var i, item, sectionHTML;

        if (sectionCode === "01") {
            var itemsPerPage = 4;
            var page = 1;
            var startIndex = (page - 1) * itemsPerPage;
            var endIndex = Math.min(startIndex + itemsPerPage, items.length);

            for (i=startIndex;i<endIndex;i++) {
                item = items[i];

                sectionHTML = "<li>";
                sectionHTML += "<div class=\"section-img\" " +
                    "style=\"background-image: url('" + item.img + "')\"></div>";
                sectionHTML += "<div class=\"section-name\">";
                sectionHTML += item.name;
                sectionHTML += "</div>";
                sectionHTML += "<div class=\"section-score\">";
                sectionHTML += item.score;
                sectionHTML += "</div>";
                sectionHTML += "<div class=\"section-info\">";
                sectionHTML += item.location + " - " + item.category;
                sectionHTML += "</div>";
                sectionHTML += "</li>";

                $(".section-contents.section" + sectionCode + ">ul").append(sectionHTML);
            }

            $(".section-contents.section" + sectionCode + ">ul>li").on("click", function() {
                location.href = "store.html";
            });
        }
        else if (sectionCode === "02") {
            for (i=0;i<items.length;i++) {
                item = items[i];

                $(".section-contents.section" + sectionCode + ">ul")
                    .append("<li>#" + item + "</li>");
            }
        }
    }

    function initTopList() {
        function configureMap(topList) {
            var center = {
                lat: 0,
                lng: 0
            };

            // Create a map object and specify the DOM element for display.
            var map = new google.maps.Map(document.getElementById("map"), {
                center: center,
                scrollwheel: false,
                zoom: 12
            });

            for (var i=0;i<topList.stores.length;i++) {
                var store = topList.stores[i];

                // Create a marker and set its position.
                var marker = new google.maps.Marker({
                    map: map,
                    position: store.latLng,
                    title: store.name
                });

                center.lat += store.latLng.lat;
                center.lng += store.latLng.lng;

                console.log(marker);
            }

            center.lat /= topList.stores.length;
            center.lng /= topList.stores.length;

            map.panTo(center);
        }

        function initMap(topList) {
            require(["async!https://maps.googleapis.com/maps/api/js?key=" +
                "AIzaSyAHX_Y_cP2i1v9lchEPJ4yROwzh9nK6of0"], function() {
                configureMap(topList);
            });
        }

        $.ajax({
            url: "/api/toplists/chirstmas",
            success: function(topList) {
                $("#title-info").html(topList.clicks.toLocaleString() + " 클릭 | " + topList.date);
                $("#title-text").html(topList.title);
                $("#title-desc").html(topList.desc);

                initMap(topList);
            }
        });

        var clipboard = new Clipboard(".share-button");

        clipboard.on("success", function() {
            alert("페이지의 주소가 복사되었습니다.");
        });
    }

    function initRelatedArea() {
        $.ajax({
            url: "/api/toplist/related",
            success: function(items) {
                addItems(items, "01");
            }
        });

        $.ajax({
            url: "/api/toplist/keywords",
            success: function(items) {
                addItems(items, "02");
            }
        });
    }

    initTopList();
    initRelatedArea();

    common.initHotPlaces();
});
