require([
    "bootstrap"
], function () {

    var items = [{
        title: {
            ko: "어제",
            en: "Yesterday"
        },
        date: "2016-12-15"
    }, {
        title: {
            ko: "오늘",
            en: "Today"
        },
        date: "2016-12-16"
    }, {
        title: {
            ko: "내일",
            en: "Tommorow"
        },
        date: "2016-12-17"
    }];

    for (var i=0;i<items.length;i++) {
        var item = items[i];

        var html = "<li>" + item.title;

        if (item.title !== "오늘") {
            html += "(" + item.eng + ")";
        }

        html += " / " + item.date + "</li>";

        $("ol").append(html);
    }
});
