angular.module("myApp").factory("employees", [
  "$firebaseArray",
  function($firebaseArray) {
    const ref = firebase.database().ref();
    const employees = $firebaseArray(ref);
    let currentEmployee; // for exchange between table and form when edit
    let currentContextMode; // from Action modes (table)

    return {
      get: function() {
        return employees.$loaded();
      },
      add: function(obj) {
        return employees.$add(obj);
      },
      delete: function(obj) {
        return employees.$remove(obj);
      },
      update: function(obj) {
        return employees.$save(obj);
      },
      getCurrentEmployee: function() {
        return currentEmployee;
      },
      setCurrentEmployee: function(obj) {
        currentEmployee = obj;
      },
      getCurrentContextMode: function() {
        return currentContextMode;
      },
      setCurrentContextMode: function(obj) {
        currentContextMode = obj;
      }
    };
  }
]);
