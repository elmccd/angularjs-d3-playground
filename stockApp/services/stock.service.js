'use strict';

angular.module('stockApp').factory('stock', function () {
    return {
        get: function (company) {
            return [1, 5, 7, 9, 3];
        }
    };
});
