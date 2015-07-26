var management = require('management');

var pamApp = angular.module('pamApp',[]);

pamApp.controller("mainController", function($scope){

    $(".button-collapse").sideNav();
    $scope.runningApps = {};
    $scope.show="applicationList";
    $scope.pythonVersion="python3";

    $scope.listOfApps = management.listOfApps();
    $scope.manager = management;

    $scope.fileNameChanged = function (name){
       //TODO:check that file is valid
       $scope.AppFile = name.value;
    }
    $scope.pythonVersionCheck = function(){
        //TODO check that version exists on the system.
        console.log("changed");
    }

    $scope.performInstallation = function(){
        var path = $scope.AppFile;
        //path = path.replace(' ','\\ ');
        var file=$scope.AppFile.split('/');
        var app=file[file.length-1];
        var appSplit = app.split('.');
        var AppName = appSplit[0];
        var AppExtension = appSplit.slice(1,appSplit.length).join('');
        console.log(path);
        management.install(path,AppName,$scope.pythonVersion)
     }

    $scope.launchApp = function(appName){
        console.log("launching app "+appName);
        var appChildProcess = management.launch(appName);
        $scope.runningApps[appName] = appChildProcess;
        console.log($scope.runningApps);
    }

    $scope.stopApp = function(appName){
        $scope.runningApps.appName.kill('SIGHUP');
        delete runningApps.appName;
    }
})

management.initWorkspace();
console.log("Initialised");


