angular.module('storyService', [])
.factory('Story', function ($http) {
	var storyFactory = {};

	storyFactory.create = function (storyData) {
		return $http.post('/api', storyData);
	}
	storyFactory.all = function () {
		return $http.get('/api');
	}
	storyFactory.allStories = function () {
		return $http.get('/api/all_stories');
	}

	return storyFactory;
})
.factory('socketio', function ($rootScope) {
	console.log('hello');
	var socket = io.connect();
	return{
		on: function (eventName, callback) {
			socket.on(eventName, function () {
				var args = arguments;
				$rootScope.$apply(function (argument) {
					callback.apply(socket, args);
				});
			});
		},
		emit: function  (eventName, data, callback) {
			console.log(data.content);
			socket.emit(eventName, data, function () {
				var args = arguments;
				$rootScope.$apply(function (argument) {
					callback.apply(socket, args);
				});
			})
		}
	}
})