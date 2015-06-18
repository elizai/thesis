(function () {
    'use strict';

    angular
        .module('moneyKeep.expenses.services')
        .factory('Expenses', Expenses);

    Expenses.$inject = ['$http'];

    function Expenses($http) {
        var Expenses = {
            all: all,
            create: create,
            update: update,
            destroy: destroy
        };

        return Expenses;


        function all(week_contains) {
            var params = {};
            if (week_contains) {
                params.week_contains = week_contains;
            }
            return $http.get('/api/v1/expenses/', 
                    {params: params})
                .then(function (response) {
                    angular.forEach(response.data, 
                        function(expense) {
                        expense.timestamp = new Date(
                            expense.timestamp);
                        expense.amount = Number(
                            expense.amount);
                    });
                    return response;
                });
        }

        function create(expense) {
            return $http.post('/api/v1/expenses/', 
                expense);
        }

        function update(expense) {
            return $http.put('/api/v1/expenses/' + 
                expense.id + '/', expense);
        }

        function destroy(expense) {
            return $http.delete('/api/v1/expenses/' + 
                expense.id + '/');
        }
    }
})();