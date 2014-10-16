'use strict';

angular.module('stockApp').directive('stocksGraph', function () {
    return {
        restrict: 'EA',
        scope: {
            stocks: '='
        },
        templateUrl: 'stockApp/directives/stocksGraph/stocksGraph.directive.html',
        controller: function ($scope) {
            console.log($scope.stocks);
        }
    };
});