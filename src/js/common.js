define([
    "bootstrap",
    "easteregg"
], function () {
    function resizeHeaderSearch() {
        var mainLogoWidth = $("#main-logo").outerWidth();
        var mainMenuWidth = $("#main-menu").outerWidth();

        $("#header-search").css("padding-left", mainLogoWidth + "px");
        $("#header-search").css("padding-right", mainMenuWidth + "px");
    }

    if ($("#header-search").length > 0) {
        $(window).on("resize", function() {
            resizeHeaderSearch();
        });

        resizeHeaderSearch();
    }

    function search() {
        location.href = window._ctx.root + "/search.html";
    }

    function clearSearchKeywords() {
        $("#main-search, #top-search").val("");
    }

    var popupCssSelector = "";

    function closeLayerPopup() {
        $(popupCssSelector).hide();

        $(".hp-block-layer").remove();
        $("body").css("overflow", "");

        popupCssSelector = "";
    }

    function openLayerPopup(cssSelector) {
        if (popupCssSelector === cssSelector) {
            return;
        }

        popupCssSelector = cssSelector;

        $("body").css("overflow", "hidden");

        var blockLayerHTML = "<div class='hp-block-layer'></div>";
        $("body").append(blockLayerHTML);

        $(cssSelector).show();

        $(".hp-block-layer").on("click", function() {
            closeLayerPopup();
        });
    }

    function closeAjaxPopup() {
        $(".hp-block-layer.ajax").remove();

        if ($(".hp-block-layer").length === 0) {
            $("body").css("overflow", "");
        }

        $(".hp-layer-popup").remove();
    }

    function signUp() {
        var userId = $("#hp-user-id").val();
        var userPw = $("#hp-user-pw").val();
        var userPwCfm = $("#hp-user-pw-cfm").val();

        if (userId === undefined || userId === "") {
            alert("아이디를 입력하세요.");
            $("#hp-user-id").focus();
            return;
        }
        else if (userPw === undefined || userPw === "") {
            alert("비밀번호를 입력하세요.");
            $("#hp-user-pw").focus();
            return;
        }
        else if (userPw !== userPwCfm) {
            alert("비밀번호 확인을 동일하게 입력하세요.");
            $("#hp-user-pw-cfm").focus();
            return;
        }

        $.ajax({
            url: window._ctx.root + "/api2/member/signup",
            method: "POST",
            data: {
                userId: userId,
                userPw: userPw
            },
            success: function(data) {
                if (data.result === "ok") {
                    alert(userId + "님 환영합니다.");
                    closeAjaxPopup();
                }
                else {
                    alert("정상적으로 가입되지 않았습니다.");
                }
            },
            error: function(jqXHR) {
                if (jqXHR.status === 1500) {
                    alert(JSON.parse(jqXHR.responseText).errorMsg);
                }
                else {
                    alert(jqXHR.responseJSON.message);
                }
            }
        });
    }

    function checkSignedIn() {
        $.ajax({
            url: window._ctx.root + "/api2/member/signedin",
            success: function(data) {
                if (data.result === "yes") {
                    $(".hp-sign-up").hide();
                    $(".hp-sign-in").hide();
                    $(".hp-member-info").show();
                    $(".hp-sign-out").show();
                }
                else {
                    $(".hp-sign-up").show();
                    $(".hp-sign-in").show();
                    $(".hp-member-info").hide();
                    $(".hp-sign-out").hide();
                }
            }
        });
    }

    function signIn() {
        var userId = $("#hp-user-id").val();
        var userPw = $("#hp-user-pw").val();

        if (userId === undefined || userId === "") {
            alert("아이디를 입력하세요.");
            $("#hp-user-id").focus();
            return;
        }
        else if (userPw === undefined || userPw === "") {
            alert("비밀번호를 입력하세요.");
            $("#hp-user-pw").focus();
            return;
        }

        $.ajax({
            url: window._ctx.root + "/api2/member/signin",
            method: "POST",
            data: {
                userId: userId,
                userPw: userPw
            },
            success: function(data) {
                if (data.result === "ok") {
                    alert(userId + "님 환영합니다.");
                    closeAjaxPopup();

                    $(".hp-sign-up").hide();
                    $(".hp-sign-in").hide();
                    $(".hp-member-info").show();
                    $(".hp-sign-out").show();
                }
                else {
                    alert("정상적으로 로그인되지 않았습니다.");
                }
            },
            error: function(jqXHR) {
                if (jqXHR.status === 1500) {
                    alert(JSON.parse(jqXHR.responseText).errorMsg);
                }
                else {
                    alert(jqXHR.responseJSON.message);
                }
            }
        });
    }

    function updateMemberInfo() {
        var userPw = $("#hp-user-pw").val();
        var userPwCfm = $("#hp-user-pw-cfm").val();

        if (userPw === undefined || userPw === "") {
            alert("비밀번호를 입력하세요.");
            $("#hp-user-pw").focus();
            return;
        }
        else if (userPw !== userPwCfm) {
            alert("비밀번호 확인을 동일하게 입력하세요.");
            $("#hp-user-pw-cfm").focus();
            return;
        }

        $.ajax({
            url: window._ctx.root + "/api2/member/update",
            method: "POST",
            data: {
                userPw: userPw
            },
            success: function(data) {
                if (data.result === "ok") {
                    alert("정상적으로 수정되었습니다.");
                    closeAjaxPopup();
                }
                else {
                    alert("정상적으로 수정되지 않았습니다.");
                }
            },
            error: function(jqXHR) {
                if (jqXHR.status === 1500) {
                    alert(JSON.parse(jqXHR.responseText).errorMsg);
                }
                else {
                    alert(jqXHR.responseJSON.message);
                }
            }
        });
    }

    function attachPopupEvents(layerName) {
        if (layerName === "sign-up") {
            $("#hp-member-sign-up").on("click", function() {
                signUp();
            });

            $(".hp-reset").on("click", function() {
                $("#hp-user-id").val("");
                $("#hp-user-pw").val("");
                $("#hp-user-pw-cfm").val("");

                $("#hp-user-id").focus();
            });
        }
        else if (layerName === "sign-in") {
            $("#hp-member-sign-in").on("click", function() {
                signIn();
            });
        }
        else if (layerName === "member-info") {
            $("#hp-member-info-update").on("click", function() {
                updateMemberInfo();
            });

            $(".hp-reset").on("click", function() {
                $("#hp-user-pw").val("");
                $("#hp-user-pw-cfm").val("");

                $("#hp-user-pw").focus();
            });
        }

        $(".hp-block-layer.ajax, .hp-popup-close").on("click", function() {
            closeAjaxPopup();
        });
    }

    function openAjaxPopup(layerName) {
        $.ajax({
            url: window._ctx.root + "/layers/" + layerName + ".html",
            success: function(html) {
                $("body").css("overflow", "hidden");

                var blockLayerHTML = "<div class='hp-block-layer ajax'></div>";
                $("body").append(blockLayerHTML);

                $("body").append(html);

                $(".hp-popup-contents>input:first-child").focus();

                attachPopupEvents(layerName);
            }
        });
    }

    $("#main-logo").on("click", function() {
        location.href = window._ctx.root + "/";
    });

    $(".hp-member").on("click", function() {
        openLayerPopup(".hp-member-popup");
    });

    $(".hp-sign-up").on("click", function() {
        openAjaxPopup("sign-up");
    });

    $(".hp-sign-in").on("click", function() {
        openAjaxPopup("sign-in");
    });

    $(".hp-member-info").on("click", function() {
        openAjaxPopup("member-info");
    });

    $(".hp-sign-out").on("click", function() {
        $.ajax({
            url: window._ctx.root + "/api2/member/signout",
            success: function() {
                $(".hp-sign-up").show();
                $(".hp-sign-in").show();
                $(".hp-member-info").hide();
                $(".hp-sign-out").hide();
            }
        });
    });

    $("#main-search, #top-search").on("keyup", function(event) {
        if (event.keyCode === 13) {
            search();
        }
        else if (event.keyCode === 27) {
            clearSearchKeywords();
        }
    });

    $("#main-search-btn").on("click", function() {
        search();
    });

    $(".search-clear").on("click", function() {
        clearSearchKeywords();
    });

    function addHotPlaces(hotPlaces) {
        for (var i=0;i<hotPlaces.length;i++) {
            $("#footer-location>ul").append("<li>" + hotPlaces[i] + "</li>");
        }
    }

    function initHotPlaces() {
        $.ajax({
            url: window._ctx.root + "/api/common/hotplaces",
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

    checkSignedIn();

    return {
        initHotPlaces: initHotPlaces,
        getBestZoom: getBestZoom
    };
});
