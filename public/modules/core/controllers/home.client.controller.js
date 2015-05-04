'use strict';


angular.module('core').controller('HomeController', ['$scope', 'Authentication', 'Characters', 'Guilds',
 function ($scope, Authentication, Characters, Guilds) {
        // This provides Authentication context.
        $scope.authentication = Authentication;

        Characters.query().$promise.then(function (cRes) {
            $scope.characters = cRes;
        });

        Guilds.query().$promise.then(function (gRes) {
            $scope.guild = gRes;
        });
        
        console.log($scope);
     
     $scope.create = function () {
         console.log('hey');
     }
 }]);