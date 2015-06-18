(function () {
    'use strict';

    angular
        .module('moneyKeep.expenses.directives')
        .directive('expenses', expenses);

    function expenses() {
        var directive = {
            controller: 'ExpensesController',
            controllerAs: 'vm',
            restrict: 'E',
            scope: {
                expenses: '='
            },
            templateUrl: '/static/templates/expenses/expenses.html'
        };

        return directive;
    }
})();
