describe('user.management.sessionLimitList.controller', function () {
    beforeEach(module('sw.user.management'));

    beforeEach(function () {
        this.mockSessionLimitsListApi = jasmine.createSpyObj('sessionLimitsListApi', ['getAllSessionLimits', 'updateSessionLimits']);
        this.mockDialog = jasmine.createSpyObj('Dialog', ['summonModal']);
        this.mockUserManagementService = jasmine.createSpyObj('userManagementService', ['setEditStatus', 'setSaveEnableStatus']);
    });

    beforeEach(inject(function ($controller, $rootScope, $q, $timeout) {
        this.scope = $rootScope.$new();
        this.q = $q;
        this.rootScope = $rootScope;
        this.timeout = $timeout;
        this.ctrl = $controller;

        this.getAllSessionLimitsDefer = this.q.defer();
        this.mockSessionLimitsListApi.getAllSessionLimits.and.returnValue(this.getAllSessionLimitsDefer.promise);

        this.sessionLimitListController = $controller('user.management.sessionLimitList.controller', {
            $scope: this.scope,
            sessionLimitsListApi: this.mockSessionLimitsListApi
        });
    }));
    describe('.init()', function () {

        it('Verify whether Session Limit controller exists', function () {
            expect(this.sessionLimitListController).toBeDefined();
        });

        it('Should  call getAllSessionLimits if Session Limit controller init', function () {
            expect(this.mockSessionLimitsListApi.getAllSessionLimits).toHaveBeenCalled();
        });


        describe('when sessionLimitsListApi.getAllSessionLimits resolves with data', function () {
            beforeEach(function () {
                this.sessionLimitsData = {
                    body: [{
                            id: 1,
                            name: 'First',
                            sessionLimit: 4
                        },
                        {
                            id: 2,
                            name: 'Second',
                            sessionLimit: 7
                        }
                    ]
                };

                this.getAllSessionLimitsDefer.resolve(this.sessionLimitsData);

                this.scope.$digest();

                this.sessionLimitListController = this.ctrl('user.management.sessionLimitList.controller', {
                    $scope: this.scope,
                    sessionLimitsListApi: this.mockSessionLimitsListApi,
                    Dialog: this.mockDialog,
                    userManagementService: this.mockUserManagementService

                });

                this.rootScope.$apply();
            });


            it('initializes the row data appropriately', function () {
                expect(this.sessionLimitListController.listViewModel.rowCollection).toEqual(this.sessionLimitsData.body);

            });

            it('initializes initialData appropriately', function () {
                expect(this.sessionLimitListController.initialData).toEqual(this.sessionLimitsData.body);
            });

            it('sets isLoading to false', function () {
                expect(this.sessionLimitListController.isLoading).toBe(false);

            });

            it('sets hasResults to true', function () {
                expect(this.sessionLimitListController.hasResults).toBe(true);

            });

            it('registers all watchers on each row item', function () {
                expect(this.sessionLimitListController.watchers.length).toEqual(4);
            });

        });

        describe('when sessionLimitsListApi.getAllSessionLimits rejects', function () {

            beforeEach(function () {
                this.getAllSessionLimitsDefer.reject();

                this.scope.$digest();
            });

            it('does not initialize row data', function () {
                expect(this.sessionLimitListController.listViewModel.rowCollection).toEqual([]);

            });

            it('does not initialize initialData', function () {
                expect(this.sessionLimitListController.initialData).not.toBeDefined();
            });

            it('does not set isLoading to false', function () {
                expect(this.sessionLimitListController.isLoading).toBe(true);

            });

            it('does not set hasResults to true', function () {
                expect(this.sessionLimitListController.hasResults).toBe(false);

            });

            it('does not register a watch on each row item', function () {
                expect(this.sessionLimitListController.watchers.length).toEqual(0);

            });

        });
    });

    describe('when the \'cancelSessionLimitEdit\' event is called', function () {

        beforeEach(function () {
            this.discardConfigurationModalDefer = this.q.defer();
            this.mockDialog.summonModal.and.returnValue(this.discardConfigurationModalDefer.promise);

            this.scope.$digest();

            this.sessionLimitListController = this.ctrl('user.management.sessionLimitList.controller', {
                $scope: this.scope,
                sessionLimitsListApi: this.mockSessionLimitsListApi,
                Dialog: this.mockDialog,
                userManagementService: this.mockUserManagementService

            });

            this.rootScope.$apply();

            this.rootScope.$broadcast('cancelSessionLimitEdit');
        });

        it('displays the discard configuration modal', function () {
            expect(this.mockDialog.summonModal).toHaveBeenCalled();

        });


        describe('when the modal is confirmed', function () {

            beforeEach(function () {
                this.discardConfigurationModalDefer.resolve();
                this.scope.$digest();
            });

            it('resets the row data', function () {
                expect(this.sessionLimitListController.listViewModel.rowCollection).toEqual();
            });

            it('resets the forms to pristine', function () {
                expect(this.sessionLimitListController.forms).toEqual({});
            });

            it('calls userManagementService.setEditStatus with false', function () {
                expect(this.mockUserManagementService.setEditStatus).toHaveBeenCalledWith(false);

            });
        });

        describe('when the modal is cancelled', function () {

            beforeEach(function () {
                this.discardConfigurationModalDefer.reject();
                this.scope.$digest();
            });

            it('does not reset the row data', function () {
                expect(this.sessionLimitListController.listViewModel.rowCollection).toEqual([]);

            });

            it('does not call userManagementService.setEditStatus', function () {
                expect(this.mockUserManagementService.setEditStatus).not.toHaveBeenCalled();

            });
        });

        it('resets state when clearState fired', function () {

            this.sessionLimitListController.areAllFormsValid = false;
            this.sessionLimitListController.isLoading = false;
            this.sessionLimitListController.hasResults = true;
            this.sessionLimitListController.watchers = [function () {}];

            this.sessionLimitListController.destroyWatch();

            expect(this.sessionLimitListController.areAllFormsValid).toBe(true);
            expect(this.sessionLimitListController.isLoading).toBe(true);
            expect(this.sessionLimitListController.hasResults).toBe(false);
            expect(this.sessionLimitListController.watchers.length).toEqual(0);
        });

    });
    describe('when the \'saveSessionLimits\' event is called', function () {

        beforeEach(function () {
            this.getAllSessionLimitsDefer = this.q.defer();
            this.mockSessionLimitsListApi.updateSessionLimits.and.returnValue(this.getAllSessionLimitsDefer.promise);

            this.scope.$digest();

            this.sessionLimitListController = this.ctrl('user.management.sessionLimitList.controller', {
                $scope: this.scope,
                sessionLimitsListApi: this.mockSessionLimitsListApi,
                Dialog: this.mockDialog,
                userManagementService: this.mockUserManagementService

            });

            spyOn(this.sessionLimitListController, 'destroyWatch').and.callThrough();

            this.rootScope.$apply();

            this.rootScope.$broadcast('saveSessionLimits');
        });

        it('displays the discard configuration modal', function () {
            expect(this.mockSessionLimitsListApi.updateSessionLimits).toHaveBeenCalled();

        });

        describe('when the updateSessionLimits is resolved', function () {

            beforeEach(function () {
                this.getAllSessionLimitsDefer.resolve();
                this.scope.$digest();
            });

            it('destroyWatch should call', function () {
                expect(this.sessionLimitListController.destroyWatch).toHaveBeenCalled();
            });

            it('should call setEditStatus if new value is exist and old is false', function () {
                this.sessionLimitListController.updateEditStatus(true, undefined);
                expect(this.mockUserManagementService.setEditStatus).toHaveBeenCalledWith(true);

            });

        });

        describe('when the updateSessionLimits is rejected', function () {

            beforeEach(function () {
                this.getAllSessionLimitsDefer.reject();
                this.scope.$digest();
            });

            it('destroyWatch should not call', function () {
                expect(this.sessionLimitListController.destroyWatch).not.toHaveBeenCalled();
            });

        });

    });

});