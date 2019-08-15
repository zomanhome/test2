describe("myApp.table.controller", function() {
  beforeEach(module("myApp.table"));

  beforeEach(function() {
    this.mockEmployee = jasmine.createSpyObj("employee", [
      "delete",
      "update",
      "setContextView",
      "setAction",
      "get",
      "getCurrentContextMode"
    ]);
  });

  beforeEach(inject(function($rootScope, $controller) {
    this.scope = $rootScope.$new();
    this.TableCtrl = $controller("TableCtrl", {
      $scope: this.scope,
      employees: this.mockEmployee
    });
  }));

  it("Verify whether TableCtrl controller exists", function() {
    expect(this.TableCtrl).toBeDefined();
  });

  describe("delete", function() {
    it("Delete", function() {
      this.scope.delete();
      expect(this.mockEmployee.delete).toHaveBeenCalled();
    });
  });
});
