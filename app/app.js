'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', ['ngRoute']).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  // $locationProvider.hashPrefix('!');
  $locationProvider.html5Mode(true);
  $routeProvider
  .when("/", {
  	templateUrl: "listing.html"
  })
  .when("/product/:id", {
  	templateUrl: "product.html",
  	controller: "ProductController"
  })
  .otherwise({
  	templateUrl: "404.html",
  	redirectTo: '/404'
  });
}])
.controller('ProductController', function ($http,$scope,$routeParams,$filter) {  
	$scope.productId = $routeParams.id;

	$http.get('test-articles.json').success(function(data){
		$scope.products = data;		
		$scope.product = $filter('filter')($scope.products, {id:$scope.productId})[0];
	});
 
})
.controller('OlioController', [ '$http', '$scope', '$sce', function($http, $scope, $sce) {
		var olio = this;
		olio.products = [];	

		this.numberOfDays = function() {
			var max_days = 28;
			var days= [];
			for(var i=0; i<max_days; i++){
				days[i]=i;
			}
			return days;
		}

		//replace .json file with https://cdn-staging.olioex.com/developer/test-articles.json
		$http.get('test-articles.json').success(function(data){
			olio.products = data;			
		});

		this.showMap = function(lat, long, title){

				 $('.map-modal-body').empty()
				 .html('<iframe width="100%" height="500" src="http://maps.google.com/maps?q='+lat+','+long+'&z=15&output=embed"></iframe>');
				 $('#mapModal').modal('show');

			 	$('#productTitle').empty()
				 .html("Location of <strong>"+title+"</strong>");

		};

		this.showImage = function(largeimage, title){

				 $('.map-modal-body').empty()
				 .html('<img class="large-image-modal" src='+largeimage+' />');
				 $('#mapModal').modal('show');

			 	$('#productTitle').empty()
				 .html("<strong>"+title+"</strong>");

		};

		this.currentuser = {
			name:"John Smith",
			email:"john@smith.com",
			postcode: "N156QJ",
			lat:"51.5675644",
			long:"-0.0823413",
			profile_photo: "/images/users/d2021b4ca3ceabafbfdf9a7a6b44cbd3.jpg"
		};

		this.myLocationUrl = "http://maps.google.com/maps?q="+this.currentuser.lat+","+this.currentuser.long+"&z=11&output=embed";
		this.locurl = $sce.trustAsResourceUrl(this.myLocationUrl);

		this.dropboxesUrl = "https://www.google.com/maps/d/embed?mid=1NrGnJjrTdpzOXJyscUwI7DBpSRE&ll="+this.currentuser.lat+","+this.currentuser.long+"&z=10";
		this.dburl = $sce.trustAsResourceUrl(this.dropboxesUrl);

		this.itemLocation = function(lat,long){			
			this.itemLocationUrl = "http://maps.google.com/maps?q="+lat+","+long+"&z=11&output=embed";
			var ilurl = $sce.trustAsResourceUrl(this.itemLocationUrl);
			return ilurl;
		}


		this.distance = function(lat,long) {
			return Math.sqrt(Math.pow((olio.currentuser.lat - lat),2) + Math.pow((olio.currentuser.long - long),2))*63;
		};

}])

.directive('headerMenu', function(){
	return {
		restrict: 'E',
		templateUrl: 'header-menu.html',
		controller: function(){
			this.tab=1;

			this.selectTab = function(setTab){
				this.tab = setTab;
			};

			this.isSelected = function(checkTab){
				return this.tab === checkTab;
			};
		},
		controllerAs: 'panel', 
		replace: true
	}
})


.directive('productPanel', function(){
	return {
		restrict: 'E',
		templateUrl: 'product-panel.html'
	}
})


.directive('searchBar', function(){
	return {
		restrict: 'E',
		templateUrl: 'search-bar.html'
	}
})


.directive('productTemplate', function(){
	return {
		restrict: 'E',
		templateUrl: 'product-template.html'
	}
})

.directive('modalWindow', function(){
	return {
		restrict: 'E',
		templateUrl: 'modal-window.html'
	}
})

.directive("addItem", function(){
	return {
		restrict: 'E',
		templateUrl: 'add-item.html'
	}
})

.directive("searchFilter", function(){
	return {
		restrict: 'E',
		templateUrl: 'search-filter.html'
	}
});

