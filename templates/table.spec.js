describe("myApp.table.controller", function() {
  beforeEach(module("myApp.table"));

  beforeEach(function() {
    this.mockEmployee = jasmine.createSpyObj("employees", [
      "get",
      "delete",
      "getCurrentContextMode",
      "setCurrentEmployee",
      "setCurrentContextMode"
    ]);
  });

  beforeEach(inject(function($rootScope, $controller, $location, $q) {
    this.scope = $rootScope.$new();
    this.q = $q;
    this.rootScope = $rootScope;
    this.location = $location;
    this.location.path = jasmine.createSpy("location");
    this.deleteDefer = this.q.defer();
    this.getDefer = this.q.defer();
    this.mockEmployee.delete.and.returnValue(this.deleteDefer.promise);
    this.mockEmployee.get.and.returnValue(this.getDefer.promise);
    this.scope.checkEmployeesLength = jasmine.createSpy("checkEmployeesLength");
    this.TableCtrl = $controller("TableCtrl", {
      $scope: this.scope,
      employees: this.mockEmployee,
      location: this.location.path
    });
    this.rootScope.$apply();
  }));

  it("Verify whether TableCtrl controller exists", function() {
    expect(this.TableCtrl).toBeDefined();
  });

  describe("get", function() {
    beforeEach(function() {
      this.getDefer.resolve([1, 2, 3]);
      this.scope.$digest();
    });

    it("first method", function() {
      expect(this.scope.employees).toEqual([1, 2, 3]);
    });
  });

  describe("delete", function() {
    beforeEach(function() {
      this.deleteDefer.resolve();
      this.scope.$digest();
    });

    it("Delete employee from table", function() {
      this.scope.checkEmployeesLength = jasmine.createSpy(
        "checkEmployeesLength"
      );
      this.scope.delete();
      this.scope.employees = [];
      this.rootScope.$apply();
      expect(this.scope.checkEmployeesLength).toHaveBeenCalled();
    });
  });

  describe("editOrCreate", function() {
    it("Create employee", function() {
      const employee = { name: "Name" };
      this.scope.editOrCreate(employee);
      expect(this.mockEmployee.setCurrentEmployee).toHaveBeenCalledWith(
        employee
      );
    });
    it("Edit employee", function() {
      this.scope.editOrCreate();
      expect(this.mockEmployee.setCurrentEmployee).toHaveBeenCalledWith({});
    });
    it("Route action", function() {
      this.scope.editOrCreate();
      expect(this.location.path).toHaveBeenCalled();
    });
  });

  describe("setContextView", function() {
    it("Set context view", function() {
      this.scope.setContextView();
      expect(this.mockEmployee.setCurrentContextMode).toHaveBeenCalledWith(
        this.scope.context.mode
      );
    });
    it("Set context view", function() {
      expect(this.scope.setContextView()).toEqual(
        `templates/context-${this.scope.context.mode}.html`
      );
    });
  });

  describe("setAction", function() {
    const employee = {};
    it("Delete employee", function() {
      this.scope.delete = jasmine.createSpy("delete");
      this.scope.setAction("delete", employee);
      expect(this.scope.delete).toHaveBeenCalledWith(employee);
    });
    it("Edit employee", function() {
      this.scope.editOrCreate = jasmine.createSpy("edit");
      this.scope.setAction("edit", employee);
      expect(this.scope.editOrCreate).toHaveBeenCalledWith(employee);
    });
  });

  describe("checkEmployeesLength", function() {
    it("Set contextView to true", function() {
      this.scope.employees = [1];
      this.scope.checkEmployeesLength();
      expect(this.scope.contextView).toEqual(true);
    });
    it("Set contextView to false", function() {
      this.scope.employees = [];
      this.scope.checkEmployeesLength();
      expect(this.scope.contextView).toEqual(false);
    });
  });
});
