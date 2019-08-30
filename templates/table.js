angular
  .module("myApp.table", ["ngRoute", "myApp"])
  .config([
    "$routeProvider",
    function($routeProvider) {
      $routeProvider.when("/table", {
        templateUrl: "templates/table.html",
        controller: "TableCtrl"
      });
    }
  ])
  .controller("TableCtrl", [
    "$scope",
    "$location",
    "employees",
    function($scope, $location, employees) {
      employees.get().then(data => {
        $scope.employees = data;
        $scope.checkEmployeesLength();
      });
      $scope.contextList = [
        {
          name: "Delete",
          action: "delete"
        },
        {
          name: "Edit",
          action: "edit"
        }
      ];
      $scope.context = {};
      $scope.context.mode = employees.getCurrentContextMode() || "buttons";
      $scope.contextModes = [
        {
          value: "list",
          label: "List"
        },
        {
          value: "buttons",
          label: "Buttons"
        }
      ];
      $scope.checkEmployeesLength = _checkEmployeesLength;

      $scope.delete = function(employee) {
        employees.delete(employee).then(function() {
          $scope.checkEmployeesLength();
        });
      };

      $scope.editOrCreate = function(employee) {
        employee
          ? employees.setCurrentEmployee(employee)
          : employees.setCurrentEmployee({});
        $location.path("/form");
      };

      $scope.setContextView = function() {
        employees.setCurrentContextMode($scope.context.mode);
        return `templates/context-${$scope.context.mode}.html`;
      };

      $scope.setAction = function(action, employee) {
        switch (action) {
          case "delete":
            $scope.delete(employee);
            break;
          case "edit":
            $scope.editOrCreate(employee);
            break;
        }
      };

      function _checkEmployeesLength() {
        $scope.employees.length
          ? ($scope.contextView = true)
          : ($scope.contextView = false);
      }
    }
  ]);
