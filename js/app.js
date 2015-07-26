
var pamApp = angular.module('pamApp',[]);

pamApp.controller("mainController", function($scope){
    $scope.listOfApps = management.listOfApps();
});

