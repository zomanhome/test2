angular.module("myApp").factory("employees", [
  "$firebaseArray",
  function($firebaseArray) {
    const ref = firebase.database().ref();
    const employees = $firebaseArray(ref);

    return {
      get: function(f) {
        employees.$loaded(() => f());
        return employees;
      },
      add: function(obj, f) {
        return employees.$add(obj).then(() => f());
      },
      delete: function(obj, f) {
        return employees.$remove(obj).then(() => f());
      },
      update: function(obj) {
        return employees.$save(obj);
      }
    };
  }
]);
