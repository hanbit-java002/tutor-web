require.config({
    baseUrl: "js",

    paths: {
        "console"       : "plugins",
        "jquery"        : "vendor/jquery-{{JQUERY_VERSION}}.min",
        "bootstrap"     : "vendor/bootstrap/js/bootstrap.min",

        "common"        : "common"
    },

    shim: {
        "bootstrap": {
            deps: ["jquery"]
        }
    },

    deps: ["console"]
});
