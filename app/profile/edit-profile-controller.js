(function(){
	angular.module('TimePass')
	.controller('EditProfileController' , ['Upload', '$scope','$http', '$state' , function( Uplaod , $scope, $http , $state){
			$scope.user = JSON.parse(localStorage['User-Data']) || undefined;
			$scope.$watch(function(){
				return $scope.file;
			}, function(){
				$scope.upload($scope.file);
			});
			
			$scope.upload = function(file ){
				if(file){
					Uplaod.upload({
						url: "api/profile/editPhoto",
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

			$scope.updateusername = function(){
				var request = {
					userId: $scope.user._id,
					username: $scope.user.username
				}
				$http.post('api/profile/updateusername' , request).then (function(){
					console.log("success");
				}).catch(function(err){
					console.log("error");
				})
			};

			$scope.updatebio = function(){
				var request = {
					userId: $scope.user._id,
					bio: $scope.user.bio
				};
				$http.post('/api/profile/updatebio' , request).then(function(){
					console.log("success");
				}).catch(function(err){
					console.log("error");
				})
			}

	}]);
}())