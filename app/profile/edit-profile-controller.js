(function(){
	angular.module('TimePass')
	.controller('EditProfileController' , ['Upload', '$scope','$http', '$state' , function( Uplaod , $scope, $http , $state){
			$scope.user = JSON.parse(localStorage['User-Data']) || undefined;
			$scope.$watch(function(){
				return $scope.file;
			}, function(){
				$scope.upload($scope.file);
			});
			
			$scope.upload = function(file){
				if(file){
					Uplaod.upload({
						url: "api/profile/edit",
						method: 'POST',
						data:{userId: $scope.user._id},
						file: file
					}).progress(function(evt){
						console.log("firing");
					}).success(function(data){

					}).error(function(error){
						console.log(error);
					})
				}
			};
	}]);
}())