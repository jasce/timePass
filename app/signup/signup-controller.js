(function(){
    angular.module('TimePass')
	.controller('SignupController', ['$scope', '$state', '$http', function($scope, $state, $http){
        
        $scope.createUser = function(){
            console.log($scope.newUser);
            $http.post('api/user/signup', $scope.newUser).then(function(response){
            	
            }).catch(function(error){
                console.log(error);
            })
        }
    }]);
})();