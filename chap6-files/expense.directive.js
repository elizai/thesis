(function () {
    'use strict';

    angular
        .module('moneyKeep.expenses.directives')
        .directive('expense', expense);

    function expense() {
        var directive = {
            controller: 'ExpenseController',
            controllerAs: 'vm',
            restrict: 'E',
            scope: {
                expense: '='
            },
            templateUrl: '/static/templates/expenses/expense.html'
        };

        return directive;
    }
})();
