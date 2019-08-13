describe("myApp.table", function() {
    beforeEach(module("myApp.table"));

    beforeEach(inject(function($rootScope, $controller) {
        this.scope = $rootScope.$new();
        this.TableCtrl = $controller("TableCtrl", {
            $scope: this.scope
        });
    }));

    it("Verify whether TableCtrl controller exists", function() {
        expect(this.TableCtrl).toBeDefined();
    });
});
