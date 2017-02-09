require.config({
    baseUrl: global.root,

    paths: {
        "async"         : "js/vendor/requirejs/async",
        "console"       : "js/plugins",
        "jquery"        : "js/vendor/jquery-{{JQUERY_VERSION}}.min",
        "bootstrap"     : "js/vendor/bootstrap/js/bootstrap.min",
        "clipboard"     : "js/vendor/clipboard/clipboard.min",

        "common"        : "js/common",
        "easteregg"     : "js/easteregg"
    },

    shim: {
        "bootstrap": {
            deps: ["jquery"]
        }
    },

    deps: ["console"]
});
