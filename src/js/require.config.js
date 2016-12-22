require.config({
    baseUrl: "js",

    paths: {
        "async"         : "vendor/requirejs/async",
        "console"       : "plugins",
        "jquery"        : "vendor/jquery-{{JQUERY_VERSION}}.min",
        "bootstrap"     : "vendor/bootstrap/js/bootstrap.min",
        "clipboard"     : "vendor/clipboard/clipboard.min",

        "common"        : "common",
        "animation"     : "animation"
    },

    shim: {
        "bootstrap": {
            deps: ["jquery"]
        }
    },

    deps: ["console"]
});
