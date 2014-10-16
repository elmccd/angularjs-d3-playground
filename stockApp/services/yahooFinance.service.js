'use strict';

angular.module('stockApp').factory('yahooFinance', function ($http) {
    return {
        getAll: function (stockId, period) {
            return $http.jsonp('http://chartapi.finance.yahoo.com/instrument/1.1/' + stockId + '/chartdata;type=quote;range=' + period + '/json/?callback=JSON_CALLBACK');
        }
    };
});
