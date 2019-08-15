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
      $scope.employees = employees.get(checkEmployeesLength);
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

      $scope.delete = function(employee) {
        employees.delete(employee, checkEmployeesLength);
      };
      $scope.editOrCreate = function(employee) {
        employee
          ? employees.setCurrentEmployee(employee)
          : employees.setCurrentEmployee({});
        $location.path("/form");
      };
      // TODO: true/false
      $scope.setContextView = function() {
        if ($scope.context.mode === "buttons")
          return "templates/context-buttons.html";
        if ($scope.context.mode === "list")
          return "templates/context-list.html";

        // first time
        document.querySelector('input[type="radio"]').checked = true;
        return "templates/context-list.html";
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

      function checkEmployeesLength() {
        $scope.employees.length
          ? ($scope.contextView = true)
          : ($scope.contextView = false);
      }
    }
  ]);
