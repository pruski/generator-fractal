angular.module('<%= camelCasedName %>').factory('<%= camelCasedName %>', [

function(){
    'use strict';

    return {
        getExample: function() {
            return true;
        }
    };
}]);