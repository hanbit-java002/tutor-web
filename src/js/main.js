require([
    "bootstrap"
], function () {
    function initSection(sectionCode) {
        var url = "/api/main/section/" + sectionCode + "/items";

        if (sectionCode === "01") {
            $.ajax({
                url: url,
                success: function(items) {
                    for (var i=0;i<items.length;i++) {
                        var item = items[i];

                        var sectionHTML = "<li>";
                        sectionHTML += "<div class='section-img-box' " +
                            "style=\"background-image: url('" + item.img + "')\">";
                        sectionHTML += "<div class='layer-darker'>";
                        sectionHTML += "<div class='img-box-text'>";
                        sectionHTML += "<div class='img-box-title'>" + item.title + "</div>";
                        sectionHTML += "<div class='img-box-desc'>" + item.desc + "</div>";
                        sectionHTML += "</div>";
                        sectionHTML += "</div>";
                        sectionHTML += "</div>";
                        sectionHTML += "</li>";

                        $(".section-contents.section" + sectionCode + ">ul").append(sectionHTML);
                    }
                }
            });
        }
        else if (sectionCode === "02") {
            $.ajax({
                url: url,
                success: function(items) {
                    for (var i=0;i<items.length;i++) {
                        var item = items[i];

                        var sectionHTML = "<li>";
                        sectionHTML += "<div class='section-img-box' " +
                            "style=\"background-image: url('" + item.img + "')\">";
                        sectionHTML += "<div class='layer-darker'>";
                        sectionHTML += "<div class='img-box-text'>";
                        sectionHTML += "<div class='img-box-title'>" + item.title + "</div>";
                        sectionHTML += "<div class='img-box-divider'></div>";
                        sectionHTML += "<div class='img-box-desc'>" + item.desc + "</div>";
                        sectionHTML += "</div>";
                        sectionHTML += "<div class='editor-box'>";
                        sectionHTML += "<div class='editor-pic' " +
                            "style=\"background-image: url('" + item.editorPic + "')\"></div>";
                        sectionHTML += "<div class='editor-name'>";
                        sectionHTML += item.editorName;
                        sectionHTML += "</div>";
                        sectionHTML += "</div>";
                        sectionHTML += "</div>";
                        sectionHTML += "</div>";
                        sectionHTML += "</li>";

                        $(".section-contents.section" + sectionCode + ">ul").append(sectionHTML);
                    }
                }
            });
        }
    }

    var timer;

    function rotateMainImg() {
        var mainImgNo = parseInt((Math.random() * 100) % 3);
        var mainImgSrc = "img/main" + mainImgNo + ".jpg";

        $("#main-top").css("background-image", "url('" + mainImgSrc + "')");

        clearTimeout(timer);
        timer = setTimeout(rotateMainImg, 3000);
    }

    timer = setTimeout(rotateMainImg, 3000);

    initSection("01");
    initSection("02");
});
