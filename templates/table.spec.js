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

  beforeEach(inject(function($rootScope, $controller, $location) {
    this.scope = $rootScope.$new();
    this.location = $location;
    this.location.path = jasmine.createSpy("location");
    this.TableCtrl = $controller("TableCtrl", {
      $scope: this.scope,
      employees: this.mockEmployee,
      location: this.location.path
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
    it("Set contextView to true or false to depends on Employees length", function() {
      this.scope.employees = [1];
      this.scope.checkEmployeesLength();
      expect(this.scope.contextView).toEqual(true);
    });
    it("Set contextView to true or false to depends on Employees length", function() {
      this.scope.employees = [];
      this.scope.checkEmployeesLength();
      expect(this.scope.contextView).toEqual(false);
    });
  });
});
