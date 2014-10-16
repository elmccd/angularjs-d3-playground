'use strict';

angular.module('stockApp').filter('prettyNumber', function () {
    return function (input) {
        return input.toLocaleString();
    };
});
