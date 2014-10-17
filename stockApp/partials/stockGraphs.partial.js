'use strict';

angular.module('stockApp').controller('stockGraphs', function ($rootScope, $scope, $q, companies, yahooFinance) {

    $scope.selectedCompany = null;

    $scope.stocksData = {
        period: 7,
        dateRanges: {
            '0': {
                from: new Date(new Date().setDate(new Date().getDate() - 7)),
                label: 'Last week'
            },
            '1': {
                from: new Date(new Date().setDate(new Date().getDate() - 14)),
                label: 'Last 2 weeks'
            },
            '2': {
                from: new Date(new Date().setMonth(new Date().getMonth() - 1)),
                label: 'Last month'
            },
            '3': {
                from: new Date(new Date().setMonth(new Date().getMonth() - 2)),
                label: 'Last 2 months'
            },
            '4': {
                from: new Date(new Date().setMonth(new Date().getMonth() - 3)),
                label: 'Last 3 months'
            },
            '5': {
                from: new Date(new Date().setMonth(new Date().getMonth() - 4)),
                label: 'Last 4 months'
            },
            '6': {
                from: new Date(new Date().setMonth(new Date().getMonth() - 5)),
                label: 'Last 5 months'
            },
            '7': {
                from: new Date(new Date().setMonth(new Date().getMonth() - 6)),
                label: 'Last 6 months'
            }
        },
        companies: companies.getAll()
    };


    $scope.update = function () {
        $scope.$broadcast('draw', true);
    };

    var getData = function () {
        var promises = [];

        $scope.stocksData.companies.forEach(function (company) {
            var promise = yahooFinance.get(company.stockId, $scope.stocksData.dateRanges[$scope.stocksData.period].from);

            promise.then(function (data) {
                company.data = data.data.series;
            });

            promises.push(promise);
        });

        $q.all(promises).then(function () {
            $scope.$broadcast('draw', true);
        });
    };

    $scope.$watch('stocksData.period', getData);

});


