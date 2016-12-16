require([
    "bootstrap"
], function () {

    var data = {
        greeting: "Hello",
        students: [{
            name: "이상윤",
            gender: "남"
        }, {
            name: "조영욱",
            gender: "남"
        }, {
            name: "백수현",
            gender: "여"
        }]
    };

    for (var i=0;i<data.students.length;i++) {
        var gender = data.students[i].gender;

        if (gender === "남") {
            gender = "male";
        }
        else {
            gender = "female";
        }

        $("ol").append("<li class=\"" + gender +"\">" +
            data.greeting + ", " + data.students[i].name + "</li>");
    }

});
