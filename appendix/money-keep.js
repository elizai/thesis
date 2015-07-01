(function () {
    'use strict';

    angular
        .module('moneyKeep', [
            'moneyKeep.config',
            'moneyKeep.routes',
            'moneyKeep.authentication',
            'moneyKeep.layout',
            'moneyKeep.expenses',
            'moneyKeep.utils'
        ]);

    angular
        .module('moneyKeep.config', []);

    angular
        .module('moneyKeep.routes', ['ngRoute']);

    angular
        .module('moneyKeep')
        .run(run);

    run.$inject = ['$http'];

    function run($http) {
        $http.defaults.xsrfHeaderName = 'X-CSRFToken';
        $http.defaults.xsrfCookieName = 'csrftoken';
    }
})();
