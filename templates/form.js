angular
  .module("myApp.form", ["ngRoute", "myApp"])
  .config([
    "$routeProvider",
    function($routeProvider) {
      $routeProvider.when("/form", {
        templateUrl: "templates/form.html",
        controller: "FormCtrl"
      });
    }
  ])
  .controller("FormCtrl", [
    "$scope",
    "$location",
    "employees",
    function($scope, $location, employees) {
      $scope.currentEmployee = employees.getCurrentEmployee();

      $scope.cancelEdit = function() {
        $scope.currentEmployee = {};
        employees.setCurrentEmployee({});
        $location.path("/table");
      };
      $scope.saveEdit = function(myForm, employee) {
        if (myForm.$valid) {
          delete employee.confirmPassword;
          if (employee.$id) {
            $scope.update(employee);
          } else {
            $scope.create(employee);
          }
        }
      };
      $scope.create = function(employee) {
        employees.add(employee);
        $location.path("/table");
      };
      $scope.update = function(employee) {
        employees.update(employee);
        $location.path("/table");
      };
    }
  ]);
