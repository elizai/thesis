(function () {
    'use strict';

    angular
        .module('moneyKeep.authentication.services')
        .factory('Authentication', Authentication);

    Authentication.$inject = ['$http', '$cookies'];

    function Authentication($http, $cookies) {
        var Authentication = {
            register: register,
            login: login,
            isAuthenticated: isAuthenticated,
            logout: logout,
            getAuthenticatedAccount: getAuthenticatedAccount
        };

        return Authentication;

        function register(email, username, password) {
            return $http.post('api/v1/accounts/', {
                username: username,
                password: password,
                email: email
            }).then(registerSuccessFn, registerErrorFn);

            function registerSuccessFn(response) {
                Authentication.login(email, password);
            }

            function registerErrorFn(response) {
                console.log("Registration error");
            }
        }

        function login(email, password) {
            return $http.post('api/v1/auth/login/', {
                password: password,
                email: email
            }).then(loginSuccessFn, loginErrorFn);

            function loginSuccessFn(response) {
                setAuthenticatedAccount(response.data);

                window.location = '/';
                return response;
            }

            function loginErrorFn(response) {
                console.log("Login error");
                return response;
            }
        }

        function getAuthenticatedAccount() {
            if (!$cookies.authenticatedAccount) {
                return;
            }

            return JSON.parse($cookies.authenticatedAccount);
        }

        function setAuthenticatedAccount(account) {
            $cookies.authenticatedAccount = JSON.stringify(account);
        }

        function isAuthenticated() {
            return !!$cookies.authenticatedAccount;
        }

        function unauthenticate() {
            delete $cookies.authenticatedAccount;
        }

        function logout() {
            return $http.post('api/v1/auth/logout/')
                .success(function (data, status, headers, config) {
                    unauthenticate();
                    window.location = '/';
                });
        }
    }
})();
