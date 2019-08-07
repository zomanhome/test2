(function () {
    'use strict';
    angular.module('sw.user.management')
        .controller('user.management.sessionLimitList.controller', sessionLimitListController);

    sessionLimitListController.$inject = ['$log', '$scope', 'SessionLimitListModel', 'sessionLimitsListApi', 'Dialog', 'lcI18n', 'userManagementService', 'userManagementConstant', '$timeout'];

    function sessionLimitListController($log, $scope, SessionLimitListModel, sessionLimitsListApi, Dialog, lcI18n, userManagementService, userManagementConstant, $timeout) {
        var sessionLimitListVm = this;

        // forms - variable for storing all input form wrappers
        sessionLimitListVm.forms = {};
        sessionLimitListVm.areAllFormsValid = true;
        sessionLimitListVm.isLoading = true;
        sessionLimitListVm.hasResults = false;
        sessionLimitListVm.watchers = [];
        sessionLimitListVm.init = _init;
        sessionLimitListVm.destroyWatch = _destroyWatch;
        sessionLimitListVm.setFormsWatchers = _setFormsWatchers;
        sessionLimitListVm.getSessionLimits = _getSessionLimits;
        sessionLimitListVm.updateEditStatus = _updateEditStatus;

        sessionLimitListVm.listViewModel = SessionLimitListModel.getTableModel();

        function _init() {
            _getSessionLimits();
        }

        function _getSessionLimits() {
            sessionLimitsListApi.getAllSessionLimits().then(function (response) {
                Eif(response.body) {
                    sessionLimitListVm.listViewModel.rowCollection = response.body;
                    sessionLimitListVm.initialData = angular.copy(response.body);
                    sessionLimitListVm.isLoading = false;
                    sessionLimitListVm.hasResults = true;

                    _setFormsWatchers(response.body);
                }
            });
        }

        // Method _setFormsWatchers is intended to notify the parent controller if there were changes in any of the forms.
        // If one of the forms was changed, its $dirty becomes true.
        // As $watch triggers in cases when either or both of arguments are undefined, it's necessary to only emit true to the parent
        // controller when $dirty changes from false to true.
        function _setFormsWatchers(data) {
            data.forEach(function (row) {
                sessionLimitListVm.watchers.push($scope.$watch('sessionLimitListVm.forms[' + row.id + '].$dirty', _updateEditStatus));

                sessionLimitListVm.watchers.push($scope.$watch('sessionLimitListVm.forms[' + row.id + '].$invalid', function (newValue) {
                    Iif(newValue) {
                        sessionLimitListVm.areAllFormsValid = false;
                    } else {
                        sessionLimitListVm.areAllFormsValid = Object.values(sessionLimitListVm.forms).every(function (form) {
                            return form === undefined || form.$valid;
                        });
                    }
                }));
            });
        }

        function _destroyWatch() {
            sessionLimitListVm.watchers.forEach(function (watcher) {
                watcher();
            });

            sessionLimitListVm.areAllFormsValid = true;
            sessionLimitListVm.isLoading = true;
            sessionLimitListVm.hasResults = false;
            sessionLimitListVm.watchers = [];
            userManagementService.setEditStatus(false);
        }

        $scope.$on('cancelSessionLimitEdit', function () {
            var data = {
                title: lcI18n.getLocalizedValue('lcCommon.discardConfiguration'),
                impactMessage: lcI18n.getLocalizedValue('lcCommon.recordDiscardMessageOne'),
                confirmationMessage: lcI18n.getLocalizedValue('lcCommon.recordDiscardMessageTwo')
            };

            Dialog.summonModal('partials/global/_discard-configuration.html', data)
                .then(function () {
                    sessionLimitListVm.listViewModel.rowCollection = angular.copy(sessionLimitListVm.initialData);
                    Object.values(sessionLimitListVm.forms).forEach(function (form) {
                        form.$setPristine();
                    });
                    userManagementService.setEditStatus(false);
                });
        });

        $scope.$on('saveSessionLimits', function () {
            var data = {
                data: sessionLimitListVm.listViewModel.rowCollection
            };
            sessionLimitsListApi.updateSessionLimits(data).then(function (response) {
                sessionLimitListVm.destroyWatch();
                _getSessionLimits();
            });
        });

        $scope.$watch('sessionLimitListVm.areAllFormsValid', function (newValue) {
            userManagementService.setSaveEnableStatus(newValue);
        });

        function _updateEditStatus(newValue, oldValue) {
            if (newValue && !oldValue) {
                userManagementService.setEditStatus(true);
            }
        }

        _init();
    }
})();