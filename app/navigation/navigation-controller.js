(function(){
	angular.module('TimePass')
	.controller('NavigationController', ['$scope', '$http', '$state', function($scope , $http, $state){
		
		if(localStorage['User-Data']){
			$scope.loggedIn = true;
		}
		else{
			$scope.loggedIn = false;
		}


		$scope.logUserIn = function(){

			 $http.post('api/user/login', $scope.login).then(function(response){
               localStorage.setItem('User-Data', JSON.stringify(response.data));
               $scope.loggedIn = true;
            }).catch(function(error){
                console.log(error);
            });
		};
		$scope.logOut = function(){
			localStorage.clear();
			$scope.loggedIn = false;
		}

	}]);


}());