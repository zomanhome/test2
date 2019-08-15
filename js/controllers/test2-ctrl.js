(function() {
  angular
    .module("myApp", ["ngRoute", "firebase", "myApp.table", "myApp.form"])
    .config([
      "$locationProvider",
      "$routeProvider",
      function($locationProvider, $routeProvider) {
        $locationProvider.hashPrefix("!");
        $routeProvider.otherwise({ redirectTo: "/table" });
      }
    ]);

  angular.module("myApp").controller("test2Ctrl", function() {});
})();
