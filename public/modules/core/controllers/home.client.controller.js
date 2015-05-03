'use strict';


angular.module('core').controller('HomeController', ['$scope', 'Authentication', 'Characters',
	function($scope, Authentication, Characters) {
		// This provides Authentication context.
		$scope.authentication = Authentication;
        
        $scope.characters = Characters.query();
        
        
        
	}
]);