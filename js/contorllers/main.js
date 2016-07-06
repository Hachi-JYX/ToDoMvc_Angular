/**
 * Created by akita on 2016/7/6.
 */

(function (angular) {
	"use strict";

	var controllers = angular.module('app.contorllers.main',['app.service.main']);
	controllers.controller('MainController', ['$scope',
		'$routeParams',
		'MainService',
		function($scope,$routeParams,MainService) {

		$scope.text = '';//文本框

		$scope.todos = MainService.gettodos();


		// 添加todo
		$scope.add = function() {
			if(!$scope.text){
				return;
			}
			MainService.add($scope.text);
			// 清空文本框
			$scope.text = '';
		};

		$scope.remove = function (id){
			MainService.remove(id);
		};

		//清空已完成
		$scope.clear = function () {
		 	var newtodos = MainService.clearCompleted();
			$scope.todos = newtodos;
		}

		//是否有已完成
		$scope.existCompleted = function () {
		   return MainService.existCompleted();
		}

		$scope.currentEditingId = -1;
		$scope.editing = function (id) {
			for(var i=0;i<$scope.todos.length;i++){
				if($scope.todos[i].id === id){
					if (!$scope.todos[i].complete){
						$scope.currentEditingId = id;
					}
				}
			}

		}
		$scope.toggle = function () {
			MainService.update();

		}
		$scope.save = function () {
			for(var i=0;i<$scope.todos.length;i++){
				$scope.currentEditingId = -1;
			}

		}


		$scope.toggleAll = function () {
			MainService.toggleAll();
		}

		$scope.selector = {};
		var status = $routeParams.status;
		switch(status){
			case 'active':
				$scope.selector = {complete:false};
				break;
			case 'completed':
				$scope.selector = {complete:true};
				break;
			default:
				$scope.selector = {};
				break;
		}



	}]);
})(angular);
