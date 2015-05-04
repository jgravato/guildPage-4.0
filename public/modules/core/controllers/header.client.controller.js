'use strict';

angular.module('core').controller('HeaderController', ['$scope', '$rootScope', 'Authentication', 'Menus', 'Socket', 'Characters',
 function ($scope, $rootScope, Authentication, Menus, Socket, Characters) {
        $scope.authentication = Authentication;
        $scope.isCollapsed = false;
        $scope.menu = Menus.getMenu('topbar');

        $scope.toggleCollapsibleMenu = function () {
            $scope.isCollapsed = !$scope.isCollapsed;
        };
        
        // Collapsing the menu after navigation
        $scope.$on('$stateChangeSuccess', function () {
            $scope.isCollapsed = false;
        });
        Socket.on('character.created', function (character) {
            $rootScope.myCharValue = true;
//            console.log($rootScope);
        });
       Socket.on('guild.created', function (guild) {
            $rootScope.myGuildValue = true;
//            console.log($rootScope);
        });
      Socket.on('character.deleted', function (character) {
            $rootScope.characterDeletedValue = true;
//            console.log($rootScope);
        });
     Socket.on('guild.deleted', function (guild) {
            $rootScope.guildDeletedValue = true;
//            console.log($rootScope);
        });
 }
]);