(function() {
  angular
    .module("myApp", ["ngRoute", "firebase"])
    .config(function($routeProvider) {
      let baseUrl = "templates/";
      if (document.location.host.indexOf("github") !== -1) {
        baseUrl = "/test2/templates/";
      }
      $routeProvider.when("/table", {
        templateUrl: `${baseUrl}table.html`
      });
      $routeProvider.when("/form", {
        templateUrl: `${baseUrl}form.html`
      });
      $routeProvider.otherwise({
        templateUrl: `${baseUrl}table.html`
      });
    });

  angular
    .module("myApp")
    .controller("test2Ctrl", function($scope, $location, employees) {
      $scope.employees = employees.get(checkEmployeesLength);

      $location.path("/table");

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

      $scope.create = function(employee) {
        employees.add(employee, checkEmployeesLength);
        $location.path("/table");
      };

      $scope.delete = function(employee) {
        employees.delete(employee, checkEmployeesLength);
      };

      $scope.editOrCreate = function(employee) {
        $scope.currentEmployee = employee ? employee : {};
        $location.path("/form");
      };

      $scope.update = function(employee) {
        employees.update(employee);
        $location.path("/table");
      };

      $scope.cancelEdit = function() {
        $scope.currentEmployee = {};
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

      $scope.setContextView = function() {
        if ($scope.context.mode === "buttons") {
          if (document.location.host.indexOf("github") !== -1) {
            return "/test2/templates/context-buttons.html";
          }
          return "templates/context-buttons.html";
        }
        if ($scope.context.mode === "list") {
          if (document.location.host.indexOf("github") !== -1) {
            return "/test2/templates/context-list.html";
          }
          return "templates/context-list.html";
        }
        // first time
        document.querySelector('input[type="radio"]').checked = true;
        if (document.location.host.indexOf("github") !== -1) {
          return "/test2/templates/context-list.html";
        }
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
    });
})();
