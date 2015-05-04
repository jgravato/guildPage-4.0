'use strict';


angular.module('core').controller('HomeController', ['$scope', 'Authentication', 'Characters',
 function ($scope, Authentication, Characters) {
        // This provides Authentication context.
        $scope.authentication = Authentication;

        Characters.query().$promise.then(function (res) {
            $scope.characters = res;
            //    console.log($scope.characters.name);
            console.log($scope.characters[0].name);
        });
 }]);