describe("myApp.form", function() {
    beforeEach(module("myApp.form"));

    beforeEach(inject(function($rootScope, $controller) {
        this.scope = $rootScope.$new();
        this.FormCtrl = $controller("FormCtrl", {
            $scope: this.scope
        });
    }));

    it("Verify whether FormCtrl controller exists", function() {
        expect(this.FormCtrl).toBeDefined();
    });
});