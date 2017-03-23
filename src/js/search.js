require([
    "common"
], function () {

    var common = require("common");

    var mapInfo = {
        map: null,
        center: {
            lat: 0,
            lng: 0
        },
        isBig: false,
        SMALL_LIST_WIDTH: "40%",
        SMALL_INFO_WIDTH: "400px"
    };

    function configureMap(list) {
        var minLat = 5000, maxLat = -5000, minLng = 5000, maxLng = -5000;

        // Create a map object and specify the DOM element for display.
        mapInfo.map = new google.maps.Map(document.getElementById("map"), {
            center: mapInfo.center,
            scrollwheel: false,
            mapTypeControl: false,
            zoom: 15
        });

        for (var i=0;i<list.stores.length;i++) {
            var store = list.stores[i];

            // Create a marker and set its position.
            var marker = new google.maps.Marker({
                map: mapInfo.map,
                position: store.latLng,
                title: store.name
            });

            minLat = Math.min(minLat, store.latLng.lat);
            maxLat = Math.max(maxLat, store.latLng.lat);
            minLng = Math.min(minLng, store.latLng.lng);
            maxLng = Math.max(maxLng, store.latLng.lng);

            if (false) {
                console.log(marker);
            }
        }

        mapInfo.center = {
            lat: (maxLat + minLat) / 2,
            lng: (maxLng + minLng) / 2
        };

        var zoom = common.getBestZoom(minLat, maxLat, minLng, maxLng,
            $("#map").width(), $("#map").height(), 18);

        mapInfo.map.panTo(mapInfo.center);
        mapInfo.map.setZoom(zoom);
    }

    function resizeMap() {
        google.maps.event.trigger(mapInfo.map,'resize');
        mapInfo.map.panTo(mapInfo.center);
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

    $("#map-control").on("click", function() {
        mapInfo.isBig = !mapInfo.isBig;

        if (mapInfo.isBig) {
            $(".search-list").css("width", mapInfo.SMALL_LIST_WIDTH);
            $(".search-info").css("width", "calc(100% - " + mapInfo.SMALL_LIST_WIDTH + ")");

            $(this).html("지도 작게 <i class='fa fa-arrow-right'></i>");
            $(".toplist, .surrounds").css("width", "50%");
            $(".search-list>.inner").css("width", "100%");
            $(".stores>li").css("width", "100%");
            $(".stores").removeClass("big");
        }
        else {
            $(".search-list").css("width", "calc(100% - " + mapInfo.SMALL_INFO_WIDTH + ")");
            $(".search-info").css("width", mapInfo.SMALL_INFO_WIDTH);

            $(this).html("<i class='fa fa-arrow-left'></i> 지도 크게");
            $(".toplist, .surrounds").css("width", "100%");
            $(".search-list>.inner").css("width", "800px");
            $(".stores>li").css("width", "50%");
            $(".stores").addClass("big");
        }

        resizeMap();
    });

    function resizeSearchFilter() {
        var height = $(window).height() - $("#main-bar").height();

        $(".search-filter-layer").height(height);
    }

    function showSearchFilter() {
        resizeSearchFilter();

        $("body").css("overflow", "hidden");

        $(".search-filter-layer").fadeIn();
    }

    function hideSearchFilter() {
        $(".tab-more-box").hide();
        $(".search-filter-layer").fadeOut();

        $("body").css("overflow", "");
    }

    $(window).on("resize", function() {
        resizeSearchFilter();
    });

    $("#filter").on("click", function() {
        showSearchFilter();
    });

    $(".cancel-filter, .search-filter-layer").on("click", function() {
        hideSearchFilter();
    });

    $(".search-filter").on("click", function(event) {
        event.stopPropagation();

        $(".tab-more-box").hide();
    });

    $(".select-single>li").on("click", function() {
        var select = $(this).parent("ul");
        select.find("li").removeClass("active");

        $(this).addClass("active");
    });

    $(".select-multiple>li").on("click", function() {
        $(this).toggleClass("active");
    });

    $(".filter-region .select-tab>li").on("click", function(event) {
        event.stopPropagation();

        if ($(this).hasClass("tab-more")) {
            $(".tab-more-box").toggle();
            return;
        }

        $(".tab-more-box").hide();

        $(".filter-region .select-tab>li").removeClass("active");
        $(this).addClass("active");

        var region = $(this).attr("region");

        $(".region-details").hide();
        $(".region-details[region='" + region + "']").show();
    });

    initMap(tempList);

    function clearStores() {
        $(".search-list section.list .stores").empty();
    }

    function appendStore(store) {
        var storeHTML = "";

        storeHTML += "<li>";
        storeHTML += "<div class='store-img' style='background-image: url(" +
            store.img + ")'></div>";
        storeHTML += "<div class='store-text'>";
        storeHTML += "<div class='store-name'>";
        storeHTML += store.name;
        storeHTML += "</div>";
        storeHTML += "<div class='store-score'>";
        storeHTML += store.score.toFixed(1);
        storeHTML += "</div>";
        storeHTML += "<div class='store-info'>";
        storeHTML += store.location + " - " + store.category;
        storeHTML += "</div>";
        storeHTML += "<div class='store-views'>";
        storeHTML += "<i class='fa fa-eye'></i>";
        storeHTML += store.view_cnt;
        storeHTML += "</div>";
        storeHTML += "<div class='store-reviews'>";
        storeHTML += "<i class='fa fa-pencil'></i>";
        storeHTML += "0";
        storeHTML += "</div>";
        storeHTML += "</div>";
        storeHTML += "</li>";

        $(".search-list section.list .stores").append(storeHTML);
    }

    function initSearch() {
        var urlSearchParams = new window.URLSearchParams(location.search);
        var keyword = urlSearchParams.get("keyword");

        $(".search-keyword").text(keyword);

        $.ajax({
            url: "/api2/store/search",
            data: {
                keyword: keyword,
                page: 1,
                rowsPerPage: 10,
            },
            success: function(result) {
                clearStores();

                var list = result.list;

                for (var i=0; i<list.length; i++) {
                    var store = list[i];

                    appendStore(store);
                }
            },
        });
    }

    initSearch();

    common.initHotPlaces();
});
