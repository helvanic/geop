var app = angular.module('geop.controllers', []);

app.controller("GeoController", function ($scope, GeoService) {
	$scope.geo = GeoService;

	$scope.refresh = function(){
		if(!$scope.geo.isLoading){
			$scope.geo.refresh().then(function(){
				$scope.$broadcast('scroll.refreshComplete');
			});
		}
	}

	$scope.getDirections = function(user){
		console.log("Getting directions from "+user.name);
	}

	$scope.openMap = function(user){
		console.log("Opening map from "+user.name);
		var destination = [user.lat,user.long];

		var source = [$scope.geo.lat, $scope.geo.long];
		launchnavigator.navigate(destination, source);
	}
});
