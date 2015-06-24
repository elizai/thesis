(function () {
    'use strict';

    angular
        .module('moneyKeep.utils.services')
        .factory('DateUtils', DateUtils);

    DateUtils.$inject = [];

    function DateUtils() {
        var DateUtils = {
            dateTimeFromDateAndTime: 
            dateTimeFromDateAndTime,
            dateFromDateTime: dateFromDateTime,
            timeFromDateTime: timeFromDateTime
        };

        return DateUtils;


        function dateTimeFromDateAndTime(date, time) {
            return new Date(
                date.getFullYear(), 
                date.getMonth(), 
                date.getDate(),
                time.getHours(), 
                time.getMinutes(), 
                time.getSeconds(), 
                time.getMilliseconds());
        }

        function dateFromDateTime(datetime) {
            return new Date(
                datetime.getFullYear(), 
                datetime.getMonth(), 
                datetime.getDate(), 
                0, 0, 0, 0);
        }
        function timeFromDateTime(datetime) {
            return new Date(1970, 1, 1, 
                datetime.getHours(), 
                datetime.getMinutes(), 
                datetime.getSeconds(), 
                datetime.getMilliseconds());
        }
    }

})();
