define([
    "jquery"
], function () {
    var Key = {
        LEFT: 37, UP: 38, RIGHT: 39, DOWN: 40,
        PLUS: 107, MINUS: 109
    };

    var Const = {
        INTERVAL: 30,
        MOVE: 3, MIN_MOVE: 3, MAX_MOVE: 21
    };

    var inputKeyCode = Key.RIGHT;

    function initBlock() {
        $("body").append("<div id='block' style='width:30px;height:30px;" +
            "background-color: red;z-index: 100;position: fixed;" +
            "top:0px;left:0px;'></div>");
    }

    function moveBlock() {
        var moveLeft = 0;
        var moveTop = 0;

        if (inputKeyCode === Key.LEFT) {
            moveLeft = -Const.MOVE;
        }
        else if (inputKeyCode === Key.UP) {
            moveTop = -Const.MOVE;
        }
        else if (inputKeyCode === Key.RIGHT) {
            moveLeft = Const.MOVE;
        }
        else if (inputKeyCode === Key.DOWN) {
            moveTop = Const.MOVE;
        }

        var newLeft = $("#block").position().left + moveLeft;
        var newTop = $("#block").position().top + moveTop;

        if (inputKeyCode === Key.LEFT && newLeft < 0) {
            inputKeyCode = Key.RIGHT;
        }
        else if (inputKeyCode === Key.RIGHT && newLeft > $(window).width()) {
            inputKeyCode = Key.LEFT;
        }
        else if (inputKeyCode === Key.UP && newTop < 0) {
            inputKeyCode = Key.DOWN;
        }
        else if (inputKeyCode === Key.DOWN && newTop > $(window).height()) {
            inputKeyCode = Key.UP;
        }

        $("#block").css("left", newLeft + "px");
        $("#block").css("top", newTop + "px");

        setTimeout(moveBlock, Const.INTERVAL);
    }

    $(document).on("keydown", function(event) {
        switch (event.keyCode) {
            case Key.LEFT:
            case Key.UP:
            case Key.RIGHT:
            case Key.DOWN:
                event.preventDefault();
                inputKeyCode = event.keyCode;
                break;
            case Key.PLUS:
                Const.MOVE = Math.min(Const.MOVE + 3, Const.MAX_MOVE);
                break;
            case Key.MINUS:
                Const.MOVE = Math.max(Const.MOVE - 3, Const.MIN_MOVE);
                break;
        }
    });

    initBlock();
    moveBlock();
});
