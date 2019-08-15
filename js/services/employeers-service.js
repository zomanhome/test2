angular.module("myApp").factory("employees", [
  "$firebaseArray",
  function($firebaseArray) {
    const ref = firebase.database().ref();
    const employees = $firebaseArray(ref);
    let currentEmployee; // for exchange between table and form when edit

    return {
      get: function(f) {
        employees.$loaded(() => f());
        return employees;
      },
      add: function(obj, f) {
        return employees.$add(obj).then(() => {
          if (f) f();
        });
      },
      delete: function(obj, f) {
        return employees.$remove(obj).then(() => f());
      },
      update: function(obj) {
        return employees.$save(obj);
      },
      getCurrentEmployee: function() {
        return currentEmployee;
      },
      setCurrentEmployee: function(obj) {
        currentEmployee = obj;
      }
    };
  }
]);
