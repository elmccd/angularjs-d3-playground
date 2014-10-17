'use strict';

angular.module('stockApp').directive('graphsControls', function () {
    return {
        restrict: 'EA',
        scope: {
            stocks: '=',
            update: '=onChange'
        },
        templateUrl: 'stockApp/directives/graphsControls/graphsControls.directive.html'
    };
});