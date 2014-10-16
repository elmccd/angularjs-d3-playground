'use strict';

angular.module('stockApp').directive('stocksGrid', function () {
    return {
        restrict: 'EA',
        scope: {
            stocks: '='
        },
        templateUrl: 'stockApp/directives/stocksGrid/stocksGrid.directive.html',
        controller: function ($scope) {
            console.log($scope.stocks);
        }
    };
});