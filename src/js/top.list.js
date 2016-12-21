require([
    "common"
], function () {

    var common = require("common");

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
        $.ajax({
            url: "/api/toplists/chirstmas",
            success: function(topList) {
                $("#title-info").html(topList.clicks.toLocaleString() + " 클릭 | " + topList.date);
                $("#title-text").html(topList.title);
                $("#title-desc").html(topList.desc);
            }
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
