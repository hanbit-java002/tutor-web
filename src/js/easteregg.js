define([
    "jquery"
], function () {
    var running = false;
    var escCount = 0;

    var isLive = true;

    var Key = {
        ESC: 27,
        A: 65, W: 87, D: 68, S: 83,
        LEFT: 37, UP: 38, RIGHT: 39, DOWN: 40,
        PLUS: 107, MINUS: 109,
        SPACE: 32
    };

    var Direction = {
        LEFT: -1,
        RIGHT: 1
    };

    var Action = {
        RUN: 0,
        JUMP: 1,
        DIE: 2
    };

    var Const = {
        INTERVAL: 100,
        MOVE: 3, MIN_MOVE: 3, MAX_MOVE: 21
    };

    var inputKeyCode = Key.RIGHT;
    var nextAction = Action.RUN;

    var Frame = {
        current: 0,
        frames: 4,
        direction: Direction.RIGHT,
        action: Action.RUN
    };

    function initSanta() {
        $("body").append("<div id='santa' style='width:72px;height:72px;" +
            "background-image: url(img/santa.png);z-index: 100;position: fixed;" +
            "top:0px;left:0px;'></div>");
    }

    function moveSanta() {
        var moveLeft = 0;
        var moveTop = 0;

        if (Frame.action !== Action.DIE) {
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
        }

        var newLeft = $("#santa").position().left + moveLeft;
        var newTop = $("#santa").position().top + moveTop;

        if (inputKeyCode === Key.LEFT && newLeft < 0) {
            inputKeyCode = Key.RIGHT;
            Frame.direction = Direction.RIGHT;
        }
        else if (inputKeyCode === Key.RIGHT && newLeft > $(window).width()) {
            inputKeyCode = Key.LEFT;
            Frame.direction = Direction.LEFT;
        }
        else if (inputKeyCode === Key.UP && newTop < 0) {
            inputKeyCode = Key.DOWN;
        }
        else if (inputKeyCode === Key.DOWN && newTop > $(window).height()) {
            inputKeyCode = Key.UP;
        }

        $("#santa").css("background-position",
            "-" + (Frame.current * 72) + "px -" + (Frame.action * 72) + "px");
        $("#santa").css("transform", "scaleX(" + Frame.direction + ")");

        $("#santa").css("left", newLeft + "px");

        if (Frame.action === Action.JUMP) {
            if (Frame.current === 1) {
                newTop -= 36;
            }
            else if (Frame.current === 3) {
                newTop += 36;
            }
        }

        $("#santa").css("top", newTop + "px");

        Frame.current++;

        if (Frame.current >= Frame.frames) {
            if (Frame.action === Action.DIE) {
                running = false;
                return;
            }

            Frame.current = 0;
            Frame.action = nextAction;
            nextAction = Action.RUN;
        }

        setTimeout(moveSanta, Const.INTERVAL);
    }

    function updateKeyCode(event) {
        inputKeyCode = event.keyCode;
    }

    function end() {
        isLive = false;
        nextAction = Action.DIE;
    }

    function addEvents() {
        $("#santa").on("click", function() {
            end();
        });

        $(document).on("keydown", function(event) {
            event.preventDefault();

            switch (event.keyCode) {
                case Key.LEFT:
                case Key.A:
                    Frame.direction = Direction.LEFT;
                    event.keyCode = Key.LEFT;
                    updateKeyCode(event);
                    break;
                case Key.UP:
                case Key.W:
                    event.keyCode = Key.UP;
                    updateKeyCode(event);
                    break;
                case Key.RIGHT:
                case Key.D:
                    event.keyCode = Key.RIGHT;
                    Frame.direction = Direction.RIGHT;
                    updateKeyCode(event);
                    break;
                case Key.DOWN:
                case Key.S:
                    event.keyCode = Key.DOWN;
                    updateKeyCode(event);
                    break;
                case Key.PLUS:
                    Const.MOVE = Math.min(Const.MOVE + 3, Const.MAX_MOVE);
                    break;
                case Key.MINUS:
                    Const.MOVE = Math.max(Const.MOVE - 3, Const.MIN_MOVE);
                    break;
                case Key.SPACE:
                    nextAction = Action.JUMP;
                    break;
            }
        });
    }

    function start() {
        initSanta();
        addEvents();
        moveSanta();

        running = true;
    }

    $(document).on("keydown", function(event) {
        if (!running && event.keyCode === Key.ESC) {
            escCount++;
        }
        else {
            escCount = 0;
            return;
        }

        if (escCount >= 5) {
            start();
        }
    });
});
