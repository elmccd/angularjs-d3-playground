'use strict';

angular.module('stockApp').controller('stockGraphs', function ($rootScope, $scope, $q, yahooFinance) {

    window.$scope = $scope;

    $scope.selectedCompany = null;

    $scope.stocksData = {
        period: 0,
        dateRanges: {
            '0': {
                value: '1m',
                label: 'Last week'
            },
            '1': {
                value: '2m',
                label: 'Last month'
            },
            '2': {
                value: '4m',
                label: 'Last 3 months'
            },
            '3': {
                value: '6m',
                label: 'Last 6 months'
            }
        },
        companies: [
            {
                id: 1,
                name: "Cisco Systems, Inc.",
                stockId: 'CSCO',
                visible: true,
                details: {
                    employers: 74043,
                    about: "Cisco Systems, Inc. is an American multinational corporation headquartered in San Jose," +
                        " California, that designs, manufactures, and sells networking equipment. The stock was" +
                        " added to the Dow Jones Industrial Average on June 8, 2009, and is also included in the S&P" +
                        " 500 Index, the Russell 1000 Index, NASDAQ-100 Index and the Russell 1000 Growth Stock Index."
                },
                data: []
            },
            {
                id: 2,
                name: "Microsoft Corporation",
                stockId: 'MSFT',
                visible: true,
                details: {
                    employers: 7185,
                    about: "Facebook (formerly [thefacebook]) is an online social networking service headquartered " +
                        "in Menlo Park, California. Its name comes from a colloquialism for the directory given to " +
                        "students at some American universities. Facebook was founded on February 4, 2004, by Mark " +
                        "Zuckerberg with his college roommates and fellow Harvard University students Eduardo Saverin, " +
                        "Andrew McCollum, Dustin Moskovitz and Chris Hughes."
                },
                data: []
            },
            {
                id: 3,
                name: "ABB Ltd.",
                stockId: 'ABB',
                visible: true,
                details: {
                    employers: 52069,
                    about: "Google /ɡuːɡ(ə)l/ is an American multinational corporation specializing in " +
                        "Internet-related services and products. These include online advertising technologies, " +
                        "search, cloud computing, and software. Most of its profits are derived from AdWords."
                },
                data: []
            }
        ]
    };

    $scope.update = function () {
        $scope.$broadcast('draw', true);
    };

    var getData = function () {
        var promises = [];

        $scope.stocksData.companies.forEach(function (company) {
            var promise = yahooFinance.getAll(company.stockId, $scope.stocksData.dateRanges[$scope.stocksData.period].value);
            promise.success(function (data) {
                console.info(data);
                company.data = data.series;
            });

            promises.push(promise);
        });

        $q.all(promises).then(function () {
            $scope.$broadcast('draw', true);
        });
    };



    $scope.selectedCompany = $scope.stocksData.companies[0];

    //ng-model attached to range select return string, we need number
    $scope.$watch('stocksData.period', function (newValue) {
        getData();
        if (typeof newValue === 'string') {
            $scope.stocksData.timePeriod |= 0;
        }
    });

});


