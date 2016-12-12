$(function() {
    $(".logo").css("border-color", "red");

    // JSON (JavaScript Object Notation)
    var classRoom = {
        name: "5강의실",
        location: "거구장 지하 1층",
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

    var printStudents = function() {
        for (var i=0;i<classRoom.students.length;i++) {
            var student = classRoom.students[i];
            console.log(student.name + " (" + student.gender + ")", "abcd", "hello");
        }

        return 4;
    };

    console.log(printStudents());

    $("#clickme").click(function() {
        $(this).animate({
            left: "+=500",
            top: "+=200",
            opacity: 0.1
        }, 5000, function() {
            // Animation complete.
        });
    });
});
