angular
  .module("myApp.table", ["ngRoute"])
  .config([
    "$routeProvider",
    function($routeProvider) {
      $routeProvider.when("/table", {
        templateUrl: "templates/table.html",
        controller: "TableCtrl"
      });
    }
  ])
  .controller("TableCtrl", function() {});
