(function () {
    'use strict';

    angular
        .module('moneyKeep.utils.controllers')
        .controller('PrintController', 
            PrintController);

    PrintController.$inject = ['$timeout', 'Expenses', 
        'Snackbar'];

    function PrintController($timeout, Expenses, Snackbar) {
        var vm = this;

        vm.print = print;
        vm.expenses = [];
        vm.total = 0;
        vm.average = 0;

        function print() {
            Expenses.all(vm.week).then(function (response) {
                vm.expenses = response.data;
                if (vm.expenses.length > 0) {
                    var amounts = vm.expenses.map(
                            function (expense) {
                        return expense.amount;
                    });
                    vm.total = amounts.reduce(function (a, b) {
                        return a + b;
                    }, 0);
                    vm.average = vm.total / vm.expenses.length;
                    $timeout(function () {
                        window.print();
                    });
                } else {
                    Snackbar.show(
                        "No expenses for the selected week.")
                }
           })
        }
    }
})();
