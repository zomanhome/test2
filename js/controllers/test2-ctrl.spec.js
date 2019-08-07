describe("myApp", function () {
    beforeEach(module("myApp"));

    beforeEach(inject(function ($rootScope, $controller) {
        this.scope = $rootScope.$new();
        this.ctrl = $controller("test2Ctrl", {
            $scope: this.scope
        });
    }));

    it('Verify whether myApp controller exists', function () {
        expect(this.ctrl).toBeDefined();
    });
});