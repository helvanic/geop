var app = angular.module('geop.filters', []);

app.filter("join", function () {
	return function (arr, sep) {
		return arr.join(sep);
	};
});
