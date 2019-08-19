(function(undefined) {
  "use strict";

  angular
    .module("sw.user.management")
    .factory("sessionLimitsListApi", sessionLimitsListApi);

  sessionLimitsListApi.$inject = ["$q", "$http", "$log"];

  function sessionLimitsListApi($q, $http, $log) {
    /* Based on the user management demo app, here we are determining the API request has to send mock or real.
     * The 'demo-app' has been assigned into session storage as 'true' when running the demo app.
     */
    var mockAPICall =
      angular.fromJson(sessionStorage.getItem("demo-app")) || false;

    var service = {};
    var urls = {
      getAllSessionLimitsUrl: mockAPICall
        ? "demo/data/mockSessionLimits.json"
        : "/smc-users/rest/v1/roles/sessionLimit",
      updateSessionLimitsUrl: "/smc-users/rest/v1/roles/sessionLimit"
    };

    service.getAllSessionLimits = getAllSessionLimits;
    service.updateSessionLimits = updateSessionLimits;
    return service;

    function getAllSessionLimits() {
      var deferred = $q.defer();

      $http.get(urls.getAllSessionLimitsUrl).then(success, error);
      function success(response) {
        deferred.resolve(response.data);
      }
      function error(error) {
        $log.error("Get all session limits api failed. Error:", error);
        deferred.reject(error);
      }

      return deferred.promise;
    }

    function updateSessionLimits(data) {
      var deferred = $q.defer();

      $http.put(urls.updateSessionLimitsUrl, data).then(success, error);
      function success(response) {
        deferred.resolve(response.data);
      }
      function error(error) {
        $log.error("Update session limits api failed. Error:", error);
        deferred.reject(error);
      }

      return deferred.promise;
    }
  }
})();
