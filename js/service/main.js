/**
 * Created by akita on 2016/7/6.
 */

//业务逻辑放在服务中
(function (angular) {
	angular.module('app.service.main',[])
		.service('MainService',['$window',function ($window) {
			var storage = $window.localStorage;

			var todos = storage['my_todo_list'] ? JSON.parse(storage['my_todo_list']) : [];

			function getId() {
				var id = Math.random();
				for(var i = 0; i < todos.length;i++){
					if(todos[i].id === id){
						id = getId();
						break
					}
				}
				return id;
			}

			function save() {
				storage['my_todo_list'] = JSON.stringify(todos);
			}

			this.gettodos = function () {
				return todos;
			};


			this.add = function (text) {
				todos.push({
					// 自动增长？
					id: getId(),
					// 由于$scope.text是双向绑定的，add同时肯定可以同他拿到界面上的输入
					text: text,
					complete: false
				});
				save();
			};

			this.remove = function (id) {
				//根据id删除
				for(var i=0;i<todos.length;i++){
					if(id == todos[i].id){
						todos.splice(id,1);
						break;
					}
				}
				save();
			};

			this.clearCompleted = function () {
				var arr = [];
				for(var i=0;i<todos.length;i++){
					if(!todos[i].complete){
						arr.push(todos[i]);
					}
				}
				todos = arr;
				save();
				return todos;
			}

			this.existCompleted = function () {
				for(var i=0;i<todos.length;i++){
					if(todos[i].complete){
						return true;
					}
				}
				return false;
			};

			this.update = function (id,target) {
				save();
			};

			var  now = true;
			this.toggleAll = function () {
				for(var i=0;i<todos.length;i++){
					todos[i].complete = now;
				}
				now = !now;
				save();
			};
		}]);

})(angular);
