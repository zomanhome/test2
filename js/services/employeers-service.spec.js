describe("employee service", function() {
  //var firebaseArray, rootScope, employeesService, mockFirebase;

  beforeEach(function() {
    module("myApp");
    //module("firebase");
  });

  beforeEach(function() {
    /*this.mockFirebase = jasmine.createSpyObj("employees", [
      "$loaded",
      "$add",
      "$remove",
      "$save"
    ]);*/
  });

  beforeEach(inject(function($firebaseArray, $rootScope, employees) {
    this.firebaseArray = $firebaseArray;
    this.rootScope = $rootScope;
    this.employeesService = employees;
    this.scope = this.rootScope.$new();
  }));

  it("verify the firebaseArray is exists", function() {
    expect(this.firebaseArray).toBeDefined();
  });

  describe("get method", function() {
    it("load employee from firebase", function() {
      expect(this.employeesService.get()).toEqual(
        this.firebaseArray(firebase.database().ref()).$loaded()
      );
    });
  });

  describe("add method", function() {
    it("add employee to firebase", function() {
      var obj = { name: "Name" };
      expect(this.employeesService.add(obj)).toEqual(
        this.firebaseArray(firebase.database().ref()).$add(obj)
      );
    });
  });

  describe("delete method", function() {
    it("delete employee from firebase", function() {
      var obj = { name: "Name" };
      expect(this.employeesService.delete(obj)).toEqual(
        this.firebaseArray(firebase.database().ref()).$remove(obj)
      );
    });
  });

  describe("update method", function() {
    it("update employee from firebase", function() {
      var obj = { name: "Name" };
      expect(this.employeesService.update(obj)).toEqual(
        this.firebaseArray(firebase.database().ref()).$save(obj)
      );
    });
  });

  describe("CurrentEmployee", function() {
    it("CurrentEmployee", function() {
      this.employeesService.setCurrentEmployee({ name: "Name" });
      expect(this.employeesService.getCurrentEmployee()).toEqual(
          { name: "Name" }
      );
    });
  });

  describe("CurrentContextMode", function() {
    it("CurrentContextMode", function() {
      this.employeesService.setCurrentContextMode("list");
      expect(this.employeesService.getCurrentContextMode()).toEqual(
          "list"
      );
    });
  });
});
