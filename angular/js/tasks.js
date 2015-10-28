/* 
    script for the tasks.html file 
*/
angular.module('Tasks', [])
    contant('tasksKey', 'tasks'); // settomg taskkey to tasks
    .controller('TasksController', function($scope, tasksKey) {
        // intialize tasks property on the scope to an empty array
        $scope.tasks = angular.fromJson(localStorage.getItem(tasksKey)) || [];    // empty array
        // initilize newTask to an empty object
        $scope.newTask = {};  // empty object

        function saveTasks() {
            localStorage.setItem(tasksKey, angular.toJson($scope.tasks));
        }

        // add a function to add newTask to the array
        $scope.addTask = function() {
            // push the current value of newTask into the tasks
            $scope.tasks.push($scope.newTask);
            // save the tasks
            saveTasks();
            // reset newTask to an empty object
            $scope.newTask = {}; // clears out edit box
        };

        $scope.toggleDone = function(task) {
            task.done = !task.done;
            saveTasks();
        }
    });
