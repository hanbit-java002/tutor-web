require([
    "common",
], function () {

    var common = require("common");

    var sectionInfo = {
        "01": {
            items: [],
            itemsPerPage: 4
        },
        "02": {
            items: [],
            itemsPerPage: 3
        },
        "03": {
            items: [],
            itemsPerPage: 8
        },
        "04": {
            items: [],
            itemsPerPage: 8
        },
        "05": {
            maxCategories: 6,
            items: [],
            itemsPerPage: 8
        }
    };

    function addSectionItems(sectionCode, page, items) {
        if (items) {
            sectionInfo[sectionCode].items = items;
        }

        items = sectionInfo[sectionCode].items;
        var itemsPerPage = sectionInfo[sectionCode].itemsPerPage;

        var startIndex = (page - 1) * itemsPerPage;
        var endIndex = Math.min(startIndex + itemsPerPage, items.length);

        var i, item, sectionHTML;

        if (sectionCode === "01") {
            for (i=startIndex;i<endIndex;i++) {
                item = items[i];

                sectionHTML = "<li>";
                sectionHTML += "<div class='section-img-box' " +
                    "style=\"background-image: url('" + window._ctx.root + "/" + item.img + "')\">";
                sectionHTML += "<div class='layer-darker'>";
                sectionHTML += "<div class='img-box-text'>";
                sectionHTML += "<div class='img-box-title'>" + item.title + "</div>";
                sectionHTML += "<div class='img-box-desc'>" + item.description + "</div>";
                sectionHTML += "</div>";
                sectionHTML += "</div>";
                sectionHTML += "</div>";
                sectionHTML += "</li>";

                $(".section-contents.section" + sectionCode + ">ul").append(sectionHTML);
            }

            $(".section-contents.section01>ul>li").on("click", function() {
                location.href = "top_list.html";
            });
        }
        else if (sectionCode === "02") {
            for (i=startIndex;i<endIndex;i++) {
                item = items[i];

                sectionHTML = "<li>";
                sectionHTML += "<div class='section-img-box' " +
                    "style=\"background-image: url('" + window._ctx.root + "/" + item.img + "')\">";
                sectionHTML += "<div class='layer-darker'>";
                sectionHTML += "<div class='img-box-text'>";
                sectionHTML += "<div class='img-box-title'>" + item.title + "</div>";
                sectionHTML += "<div class='img-box-divider'></div>";
                sectionHTML += "<div class='img-box-desc'>" + item.description + "</div>";
                sectionHTML += "</div>";
                sectionHTML += "<div class='editor-box'>";
                sectionHTML += "<div class='editor-pic' " +
                    "style=\"background-image: url('" + window._ctx.root + "/" + item.editorPic + "')\"></div>";
                sectionHTML += "<div class='editor-name'>";
                sectionHTML += item.editorName;
                sectionHTML += "</div>";
                sectionHTML += "</div>";
                sectionHTML += "</div>";
                sectionHTML += "</div>";
                sectionHTML += "</li>";

                $(".section-contents.section" + sectionCode + ">ul").append(sectionHTML);
            }

            $(".section-contents.section02>ul>li").on("click", function() {
                location.href = window._ctx.root + "/hanbit_picks.html";
            });
        }
        else if (sectionCode === "03" || sectionCode === "04" || sectionCode === "05") {
            for (i=startIndex;i<endIndex;i++) {
                item = items[i];

                sectionHTML = "<li store-id='" + item.id + "'>";
                sectionHTML += "<div class=\"section-img\" " +
                    "style=\"background-image: url('" + window._ctx.root + "/" + item.img + "')\"></div>";
                sectionHTML += "<div class=\"section-name\">";
                sectionHTML += item.name;
                sectionHTML += "</div>";
                sectionHTML += " <div class=\"section-score\">";
                sectionHTML += item.score.toFixed(1);
                sectionHTML += "</div>";
                sectionHTML += "<div class=\"section-info\">";
                sectionHTML += item.location + " - " + item.category;
                sectionHTML += "</div>";
                sectionHTML += "</li>";

                $(".section-contents.section" + sectionCode + ">ul").append(sectionHTML);
            }

            $(".section-contents.section" + sectionCode + ">ul>li").on("click", function() {
                var storeId = $(this).attr("store-id");

                location.href = window._ctx.root + "/sub/store.html#" + storeId;
            });
        }
    }

    function initSection(sectionCode) {
        var url = window._ctx.root;
        url += "/api2/main/section/" + sectionCode + "/items";

        if (sectionCode === "01") {
            $.ajax({
                url: url,
                success: function(items) {
                    addSectionItems(sectionCode, 1, items);
                }
            });
        }
        else if (sectionCode === "02") {
            $.ajax({
                url: url,
                success: function(items) {
                    addSectionItems(sectionCode, 1, items);
                }
            });
        }
        else if (sectionCode === "03" || sectionCode === "04" || sectionCode === "05") {
            if (sectionCode === "05") {
                $.ajax({
                    url: window._ctx.root + "/api2/main/section/" + sectionCode + "/categories",
                    success: function(categories) {
                        var maxCategories = sectionInfo[sectionCode].maxCategories;

                        for (var i=0;i<categories.length;i++) {
                            if (i === maxCategories - 1 && categories.length > maxCategories) {
                                $(".section-category>ul").append("<li>더보기</li>");
                                break;
                            }

                            $(".section-category>ul").append("<li>" + categories[i] + "</li>");
                        }
                    }
                });
            }

            $.ajax({
                url: url,
                success: function(items) {
                    addSectionItems(sectionCode, 1, items);
                }
            });
        }
    }

    var timer;
    var mainImgList = [];

    function rotateMainImg() {
        var mainImgCount = mainImgList.length;
        var mainImgIndex = parseInt((Math.random() * 100) % mainImgCount);

        var mainImgSrc = mainImgList[mainImgIndex];

        $("#main-top").css("background-image", "url('" + window._ctx.root + "/" + mainImgSrc + "')");

        clearTimeout(timer);
        timer = setTimeout(rotateMainImg, 3000);
    }

    function getMainImgs() {
        $.ajax({
            url: window._ctx.root + "/api2/main/imgs",
            success: function(imgList) {
                mainImgList = imgList;

                rotateMainImg();
            }
        });
    }

    function toggleHeader() {
        var scrollTop = document.body.scrollTop;

        if (($("body").width() <= 700 && scrollTop >= 35) ||
            scrollTop >= 430) {
            $("#main-bar").removeClass("header-transparent");
        }
        else {
            $("#main-bar").addClass("header-transparent");
        }
    }

    function handleEvents() {
        $(window).on("scroll", function() {
            toggleHeader();
        });
    }

    /*** 아래는 실행 ***/

    toggleHeader();

    getMainImgs();

    initSection("01");
    initSection("02");
    initSection("03");
    initSection("04");
    initSection("05");

    common.initHotPlaces();

    handleEvents();
});
