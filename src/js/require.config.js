require.config({
    baseUrl: window._ctx.root,

    paths: {
        "async"         : "js/vendor/requirejs/async",
        "console"       : "js/plugins",
        "jquery"        : "js/vendor/jquery-{{JQUERY_VERSION}}.min",
        "bootstrap"     : "js/vendor/bootstrap/js/bootstrap.min",
        "clipboard"     : "js/vendor/clipboard/clipboard.min",
        "sockjs"		: "js/vendor/sockjs-client/sockjs.min",
        "vertx-eventbus": "js/vendor/vertx-eventbus/vertx-eventbus.min",

        "common"        : "js/common",
        "easteregg"     : "js/easteregg",
    },

    shim: {
        "bootstrap": {
            deps: ["jquery"]
        }
    },

    deps: ["console"]
});
