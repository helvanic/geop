var app = angular.module('geop.services', []);

app.service("GeoService", function ($q, $http, $cordovaGeolocation, $ionicPopup) {
	var self = {
		'page': 1,
		'isLoading': false,
		'hasMore': true,
		'results': [],
		'lat': 0,
		'lon': 0,
		'refresh': function () {
			self.page = 1;
			self.isLoading = false;
			self.hasMore = true;
			self.results = [];
			return self.load();
		},
		'next': function () {
			self.page += 1;
			return self.load();
		},
		'load': function () {
			self.isLoading = true;
			var deferred = $q.defer();

			ionic.Platform.ready(function(){
				$cordovaGeolocation
					.getCurrentPosition({
						timeout:5000,
						enableHighAccuracy : false
					})
					.then(function(position){
						self.lat = position.coords.latitude;
						self.long = position.coords.longitude;
						var params = {
							page: self.page,
							lat: self.lat,
							lon: self.long
						};
						$http.get('http://localhost:3000/users/')
							.success(function (data) {
								self.isLoading = false;
								console.log(data);
								self.results = [];
								angular.forEach(data.users, function(user){
									self.results.push(user);
								});
								deferred.resolve();
							})
							.error(function (data, status, headers, config) {
								self.isLoading = false;
								deferred.reject(data);
							});

						return deferred.promise;
					}, function(err){
						console.error("Error getting position");
						console.error(err);
						$ionicPopup.alert({
							'title' : 'Please switch on your geolocation',
							'template' : "It seems like you've switched off your geolocation for Geop. To use Geop, you need to activate it since we need your location to build itineraries :)"
						});
					});
			});
		}
	};

	self.load();

	return self;
});
