require.config({
  baseUrl: "/assets/js",
  paths: {
    jquery: "vendor/jquery.min",
    "jquery.migrate": "vendor/migrate",
    "jquery.mobile.events": "vendor/mobile.events",
    "jquery.history": "vendor/jquery.history",
    "jquery.royalslider": "vendor/jquery.royalslider",
    "jquery.validate": "vendor/jquery.validate",
    "jquery.form": "vendor/jquery.form",
    "picker": "vendor/picker.mod",
    "picker.date": "vendor/picker.date",
    "waves": "vendor/waves"
  },
  shim: {
    "jquery.migrate": {
      deps: ["jquery"]
    },
    "jquery.mobile.events": {
      deps: ["jquery"]
    },
    "jquery.history": {
      deps: ["jquery"]
    },
    "jquery.royalslider": {
      deps: ["jquery"]
    },
    "jquery.validate": {
      deps: ["jquery"]
    }
  }
});
require(["modules/init"]);