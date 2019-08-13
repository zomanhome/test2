angular.module("myApp").directive("equal", function() {
  return {
    require: "ngModel",
    link: function(scope, element, $attrs, ctrl) {
      let validate = function(viewValue) {
        let comparisonModel = $attrs.equal;

        ctrl.$setValidity("equal", viewValue === comparisonModel);
        return viewValue;
      };

      ctrl.$parsers.unshift(validate);
      ctrl.$formatters.push(validate);

      $attrs.$observe("equal", function(comparisonModel) {
        return validate(ctrl.$viewValue);
      });
    }
  };
});
