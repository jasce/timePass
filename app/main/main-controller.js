(function(){
	angular.module('TimePass')
	.controller('MainController', ['$scope', '$http', '$interval' , function($scope, $http, $interval){

		if(localStorage['User-Data'] !== undefined){
			$scope.user = JSON.parse(localStorage['User-Data']);
			console.log($scope.user);
		}

		$scope.sendPost = function($event){
			if(event.which === 13) {// if enter key
				console.log($scope.user);
				var request = {
					user: $scope.user.username || $scope.user.email,
					userId: $scope.user._id,
					userImage: $scope.user.image,
					content: $scope.newPost
				}
				$http.post('/api/post/create', request).then(function(response){						
						$scope.posts = response.data;
				}).catch(function(error){
					console.log("error");
				})
			}
		};

		function getPosts(initial){
			$http.get('/api/post/get').then(function(response){
				if(initial){					
					$scope.posts = response.data;
				}			
				else{
					if(response.data.length > $scope.posts.length){
						$scope.incomingPosts = response.data;
					}
				}
			})
		};

		$interval(function(){
			getPosts(false);
			if($scope.incomingPosts){
				$scope.difference = $scope.incomingPosts.length - $scope.posts.length;
			}
		} , 5000);

		$scope.setNewPosts = function(){

			$scope.posts = angular.copy($scope.incomingPosts);
			$scope.incomingPosts = undefined;
		}
		// Init
		getPosts(true);

	}])

	
}())