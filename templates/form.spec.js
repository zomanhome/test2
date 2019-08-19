describe("myApp.form", function() {
  beforeEach(module("myApp.form"));

  beforeEach(function() {
    this.mockEmployee = jasmine.createSpyObj("employees", [
      "add",
      "getCurrentEmployee",
      "setCurrentEmployee",
      "update"
    ]);
  });

  beforeEach(inject(function($rootScope, $controller, $location) {
    this.scope = $rootScope.$new();
    this.location = $location;
    this.location.path = jasmine.createSpy("location");
    this.FormCtrl = $controller("FormCtrl", {
      $scope: this.scope,
      employees: this.mockEmployee,
      location: this.location.path
    });
  }));

  it("Verify whether FormCtrl controller exists", function() {
    expect(this.FormCtrl).toBeDefined();
  });

  describe("cancelEdit", function() {
    it("Cancel editing", function() {
      this.scope.cancelEdit();
      expect(this.scope.currentEmployee).toEqual({});
      expect(this.mockEmployee.setCurrentEmployee).toHaveBeenCalled();
      expect(this.location.path).toHaveBeenCalled();
    });
  });

  describe("saveEdit", function() {
    const myForm = { $valid: true };
    const employee = { $id: "Id" };
    it("Update employee", function() {
      this.scope.update = jasmine.createSpy("update");
      this.scope.saveEdit(myForm, employee);
      expect(employee.confirmPassword).not.toBeDefined();
      expect(this.scope.update).toHaveBeenCalledWith(employee);
    });
    it("Create employee", function() {
      const employee = {};
      this.scope.create = jasmine.createSpy("create");
      this.scope.saveEdit(myForm, employee);
      expect(employee.confirmPassword).not.toBeDefined();
      expect(this.scope.create).toHaveBeenCalledWith(employee);
    });
  });

  describe("create", function() {
    it("Create employee", function() {
      this.scope.create();
      expect(this.mockEmployee.add).toHaveBeenCalled();
      expect(this.location.path).toHaveBeenCalled();
    });
  });

  describe("add", function() {
    it("Add employee", function() {
      this.scope.update();
      expect(this.mockEmployee.update).toHaveBeenCalled();
      expect(this.location.path).toHaveBeenCalled();
    });
  });
});
