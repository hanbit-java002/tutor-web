define([
    "jquery"
], function () {
    var inputKeyCode = 39;

    function initBlock() {
        $("body").append("<div id='block' style='width:30px;height:30px;" +
            "background-color: red;z-index: 100;position: absolute;" +
            "top:30px;left:0px;'></div>");
    }

    function moveBlock() {
        var moveLeft = 0;
        var moveTop = 0;

        if (inputKeyCode === 37) {
            moveLeft = -10;
        }
        else if (inputKeyCode === 38) {
            moveTop = -10;
        }
        else if (inputKeyCode === 39) {
            moveLeft = 10;
        }
        else if (inputKeyCode === 40) {
            moveTop = 10;
        }

        var newLeft = $("#block").position().left + moveLeft;
        var newTop = $("#block").position().top + moveTop;

        if (inputKeyCode === 37 && newLeft < 0) {
            inputKeyCode = 39;
        }
        else if (inputKeyCode === 39 && newLeft > $(window).width()) {
            inputKeyCode = 37;
        }
        else if (inputKeyCode === 38 && newTop < 0) {
            inputKeyCode = 40;
        }
        else if (inputKeyCode === 40 && newTop > $(window).height()) {
            inputKeyCode = 38;
        }

        $("#block").css("left", newLeft + "px");
        $("#block").css("top", newTop + "px");

        setTimeout(moveBlock, 100);
    }

    $(document).on("keydown", function(event) {
        switch (event.keyCode) {
            case 37:
            case 38:
            case 39:
            case 40:
                event.preventDefault();
                inputKeyCode = event.keyCode;
        }
    });

    initBlock();
    moveBlock();
});
