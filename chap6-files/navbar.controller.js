(function () {
    'use strict';

    angular
        .module('moneyKeep.layout.controllers')
        .controller('NavbarController', 
            NavbarController);

    NavbarController.$inject = ['$rootScope', 
        '$scope', 'Authentication', 'ngDialog'];

    function NavbarController($rootScope, $scope, 
            Authentication, ngDialog) {
        var vm = this;

        vm.logout = logout;
        vm.createExpense = createExpense;
        vm.print = print;
        vm.isAuthenticated = isAuthenticated;

        $scope.$watchGroup(['vm.startDate', 
                'vm.endDate', 'vm.searchString'], function () {
            $rootScope.$broadcast('expenses.filter', {
                startDate: vm.startDate,
                endDate: vm.endDate,
                searchString: vm.searchString
            });
        });

        function logout() {
            Authentication.logout();
        }

        function createExpense() {
            ngDialog.open({
                template: 
                '/static/templates/expenses/edit-expense.html',
                controller: 'NewExpenseController as vm'
            });
        }

        function print() {
            ngDialog.open({
                template: '/static/templates/utils/print.html',
                controller: 'PrintController as vm'
            });
        }

        function isAuthenticated() {
            return Authentication.isAuthenticated();
        }
    }
})();
