'use strict';

angular.module('stockApp').controller('stockGraphs', function ($scope, stock) {

    window.$scope = $scope;

    $scope.selectedCompany = null;

    $scope.stocksData = {
        timePeriod: 6,
        companies: [
            {
                name: "Cisco",
                visible: true,
                details: {
                    employers: 74043,
                    about: "Cisco Systems, Inc. is an American multinational corporation headquartered in San Jose," +
                        " California, that designs, manufactures, and sells networking equipment. The stock was" +
                        " added to the Dow Jones Industrial Average on June 8, 2009, and is also included in the S&P" +
                        " 500 Index, the Russell 1000 Index, NASDAQ-100 Index and the Russell 1000 Growth Stock Index."
                },
                data: stock.get('cisco')
            },
            {
                name: "Facebook",
                visible: true,
                details: {
                    employers: 7185,
                    about: "Facebook (formerly [thefacebook]) is an online social networking service headquartered " +
                        "in Menlo Park, California. Its name comes from a colloquialism for the directory given to " +
                        "students at some American universities. Facebook was founded on February 4, 2004, by Mark " +
                        "Zuckerberg with his college roommates and fellow Harvard University students Eduardo Saverin, " +
                        "Andrew McCollum, Dustin Moskovitz and Chris Hughes."
                },
                data: stock.get('facebook')
            },
            {
                name: "Google",
                visible: true,
                details: {
                    employers: 52069,
                    about: "Google /ɡuːɡ(ə)l/ is an American multinational corporation specializing in " +
                        "Internet-related services and products. These include online advertising technologies, " +
                        "search, cloud computing, and software. Most of its profits are derived from AdWords."
                },
                data: stock.get('google')
            }
        ]
    };


    $scope.selectedCompany = $scope.stocksData.companies[0];

    //ng-model attached to range select return string, we need number
    $scope.$watch('stocksData.timePeriod', function (newValue) {
        if (typeof newValue === 'string') {
            $scope.stocksData.timePeriod |= 0;
        }
    });

});


