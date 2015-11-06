
angular.module('ChatApp', ['firebase'])
    .constant('firebaseUrl', 'https://info343chat.firebaseio.com/messages')
    .controller('ChatController', function($scope, $firebaseArray, firebaseUrl) {
        //TODO: implement our chat controller
        var ref = new Firebase(firebaseUrl);
        $scope.messages = $firebaseArray(ref);

        $scope.name = null;
        $scope.body = null;

        $scope.sendMessage = function() {
            // adds
            $scope.messages.$add({
                name: $scope.name,
                body: $scope.body,
                createdAt: Firebase.ServerValue.TIMESTAMP
            });
            $scope.body = null;
        };
    });
