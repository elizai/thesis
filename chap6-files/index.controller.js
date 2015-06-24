(function (_) {
  'use strict';

  angular
    .module('moneyKeep.layout.controllers')
    .controller('IndexController', IndexController);

  IndexController.$inject = ['$scope', 'Authentication', 
      'Expenses'];

  function IndexController($scope, Authentication, 
      Expenses) {
    var vm = this;

    vm.expenses = [];
    vm.filters = {};

    activate();


    function activate() {
      if (!Authentication.isAuthenticated()) {
        window.location = '/login';
        return;
      }

      Expenses.all()
        .then(function (response) {
          vm.allExpenses = response.data;
          filterExpenses();
        });

      $scope.$on('expense.created', 
        function (event, expense) {
        vm.allExpenses.push(expense);
        filterExpenses();
      });

      $scope.$on('expense.deleted', 
        function (event, expense) {
        var idx = vm.allExpenses.indexOf(expense);
        vm.allExpenses.splice(idx, 1);
        filterExpenses();
      });

      $scope.$on('expenses.filter', 
        function (event, filters) {
        vm.filters = filters;
        filterExpenses();
      });

      function filterExpenses() {
        vm.expenses = _.filter(vm.allExpenses, 
          function (expense) {
          var beforeEndDate = !vm.filters.endDate || 
            expense.timestamp <= vm.filters.endDate;
          var afterStartDate = !vm.filters.startDate || 
            expense.timestamp >= vm.filters.startDate;
          var containsQueryString = !vm.filters.searchString || (
            expense.comment.toLowerCase().indexOf(
              vm.filters.searchString.toLowerCase()) !== -1
              || expense.description.toLocaleLowerCase()
              .indexOf(vm.filters.searchString
                .toLowerCase()) !== -1);
          return beforeEndDate && afterStartDate 
              && containsQueryString;
        })
      }
    }
  }
})(_);
