'use strict';

angular.module('stockApp').factory('yahooFinance', function ($http, $q) {
    var stocks = {};

    var createPromise = function (data) {
        return $q(function (resolve) {
            resolve({
                data: data
            });
        });
    };

    var getAll = function (stockId) {
        return $http
            .jsonp('http://chartapi.finance.yahoo.com/instrument/1.1/' +
                stockId + '/chartdata;type=quote;range=6m/json/?callback=JSON_CALLBACK').success(function (data) {
                stocks[stockId] = data;
            });
    };

    var getPeriod = function (stockId, from) {
        if (!stocks[stockId]) {
            return getAll(stockId);
        }
        var filtered = stocks[stockId].series.filter(function (record) {
            return new Date(record.date) >= from;
        });

        return createPromise({
            series: filtered
        });
    };

    return {
        get: function (stockId, from) {
            if (!stocks[stockId]) {
                return getAll(stockId);
            } else {
                return getPeriod(stockId, from);
            }
        }
    };
});
