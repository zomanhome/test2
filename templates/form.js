angular
  .module("myApp.form", ["ngRoute"])
  .config([
    "$routeProvider",
    function($routeProvider) {
      $routeProvider.when("/form", {
        templateUrl: "templates/form.html",
        controller: "FormCtrl"
      });
    }
  ])
  .controller("FormCtrl", [function() {}]);
