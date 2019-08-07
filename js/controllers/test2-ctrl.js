const myApp = angular.module('myApp', ['ngRoute', 'firebase']);
myApp
  .config(function ($routeProvider) {
    let baseUrl = '/templates/';
    if (document.location.host.indexOf('github') !== -1) {
      baseUrl = '/test2/templates/';
    }

    $routeProvider.when('/table', {
      templateUrl: `${baseUrl}table.html`
    });
    $routeProvider.when('/form', {
      templateUrl: `${baseUrl}form.html`
    });
    $routeProvider.otherwise({
      templateUrl: `${baseUrl}table.html`
    });
  })
  .controller('test2Ctrl', function ($scope, $location, $firebaseArray) {
    $location.path('/table');

    const ref = firebase.database().ref();

    $scope.employees = $firebaseArray(ref);
    $scope.employees.$loaded().then(() => {
      $scope.employees.length ? ($scope.contextView = true) : ($scope.contextView = false);
    });

    $scope.contextList = [{
        name: 'Delete',
        action: 'delete'
      },
      {
        name: 'Edit',
        action: 'edit'
      }
    ];
    $scope.context = {};
    $scope.contextModes = [{
        value: 'list',
        label: 'List'
      },
      {
        value: 'buttons',
        label: 'Buttons'
      }
    ];

    $scope.create = function (employee) {
      $scope.employees.$add(employee).then(() => {
        $scope.employees.length ?
          ($scope.contextView = true) :
          ($scope.contextView = false);
      });
      $location.path('/table');
    };

    $scope.delete = function (employee) {
      $scope.employees.$remove(employee).then(() => {
        $scope.employees.length ?
          ($scope.contextView = true) :
          ($scope.contextView = false);
      });
    };

    $scope.editOrCreate = function (employee) {
      $scope.currentEmployee = employee ? employee : {};
      $location.path('/form');
    };

    $scope.update = function (employee) {
      $scope.employees.$save(employee);
      $location.path('/table');
    };

    $scope.cancelEdit = function () {
      $scope.currentEmployee = {};
      $location.path('/table');
    };

    $scope.saveEdit = function (myForm, employee) {
      if (myForm.$valid) {
        delete employee.confirmPassword;
        if (employee.$id) {
          $scope.update(employee);
        } else {
          $scope.create(employee);
        }
      }
    };

    $scope.setContextView = function () {
      if ($scope.context.mode === 'buttons') {
        if (document.location.host.indexOf('github') !== -1) {
          return '/test2/templates/context-buttons.html';
        }
        return '/templates/context-buttons.html';
      }
      if ($scope.context.mode === 'list') {
        if (document.location.host.indexOf('github') !== -1) {
          return '/test2/templates/context-list.html';
        }
        return '/templates/context-list.html';
      }
      // first time
      document.querySelector('input[type="radio"]').checked = true;
      if (document.location.host.indexOf('github') !== -1) {
        return '/test2/templates/context-list.html';
      }
      return '/templates/context-list.html';
    };

    $scope.setAction = function (action, employee) {
      switch (action) {
        case 'delete':
          $scope.delete(employee);
          break;
        case 'edit':
          $scope.editOrCreate(employee);
          break;
      }
    };
  });