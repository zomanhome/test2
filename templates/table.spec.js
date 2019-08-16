describe("myApp.table.controller", function() {
  beforeEach(module("myApp.table"));

  beforeEach(function() {
    this.mockEmployee = jasmine.createSpyObj("employee", [
      "get",
      "delete",
      "getCurrentContextMode",
      "setCurrentEmployee",
      "setCurrentContextMode"
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
    it("Delete employee from table", function() {
      this.scope.delete();
      expect(this.mockEmployee.delete).toHaveBeenCalled();
    });
  });

  describe("editOrCreate", function() {
    it("Edit employee from table row or create a new one", function() {
      this.scope.editOrCreate();
      expect(this.mockEmployee.setCurrentEmployee).toHaveBeenCalled();
    });
   });

    describe("setContextView", function() {
        it("Set context view", function() {
            this.scope.setContextView();
            //expect(this.mockEmployee.getCurrentContextMode).toHaveBeenCalled();
            expect(this.mockEmployee.setCurrentContextMode).toHaveBeenCalled();
        });
    });

    describe("setAction", function() {
        it("Action with employee", function() {
            expect(this.scope.setAction("delete")).toEqual(undefined);
            expect(this.scope.setAction("edit")).toEqual(undefined);
        });
    });

    describe("checkEmployeesLength", function() {
        it("Set contextView true or false to depends on length", function() {
            expect(this.scope.checkEmployeesLength()).toEqual(undefined);
        });
    });
});
