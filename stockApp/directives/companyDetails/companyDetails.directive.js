'use strict';

angular.module('stockApp').directive('companyDetails', function () {
    return {
        restrict: 'EA',
        scope: {
            company: '='
        },
        templateUrl: 'stockApp/directives/companyDetails/companyDetails.directive.html'
    };
});