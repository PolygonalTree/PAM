(function(){
var management = require('management');
var fs = require('fs');
var Console = require('console').Console;

var errorOutput = fs.createWriteStream('./stderr.log');
var output = fs.createWriteStream('./out.log');
var logger = new Console(output, errorOutput);

var pamApp = angular.module('pamApp',[]);

if (sessionStorage.lastView == null){
    sessionStorage.lastView = "applicationList";
    sessionStorage.isInstalling =false;
}





pamApp.controller("mainController", function($scope, $timeout){
    $scope.manager = {};
    $scope.install = {};
    $scope.manager.output="";
    $(".button-collapse").sideNav();
    $scope.manager.runningApps = {};
    $scope.manager.show=sessionStorage.lastView;
    $scope.install.pythonVersion="python3";
    $scope.manager.listOfApps = management.listOfApps();

    $scope.manager.check = function(){
        outfile=fs.readFileSync('./out.log');
        outfile=String(outfile);
        if (outfile.search("Installation exited with code")>0){
            $scope.manager.output="Error on launch";
            $timeout(function(){$scope.manager.output=""},5000);
        }else if(outfile.search("Launch completed")>0){
            fs.writeFile('./out.log', '', function(){console.log('done')});
            $scope.manager.output="Application Closed";
            $scope.$apply();
       };
    }

    $scope.manager.checkInstall = function(){
        console.log("CALLED");
        outfile=fs.readFileSync('./out.log');
        outfile=String(outfile);
        if (outfile.search("Instalation_complete")>0){
            $scope.manager.output="Instalation Completed";

            console.log($scope.manager.output);
            fs.writeFile('./out.log', '', function(){console.log('done'); });
            $scope.manager.show="applicationList";
            sessionStorage.lastView="applicationList";
            $timeout.cancel(checking);
            $scope.$apply();

        }else if(outfile.search("exited with code")>0){
            $scope.manager.output="Instalation Error for more info check out.log";
            $timeout.cancel(checking);
        }else if (sessionStorage.isInstalling){
            checking=$timeout($scope.manager.checkInstall,3000);
        };
    }

    if (sessionStorage.isInstalling){
        console.log("Installing");
        $scope.manager.checkInstall();
        checking=$timeout($scope.manager.checkInstall,1000);
    }

    $scope.install.fileNameChanged = function (name){
       //TODO:check that file is valid
       $scope.AppFile = name.value;
    }
    $scope.install.pythonVersionCheck = function(){
        //TODO check that version exists on the system.
        console.log("changed");
    }

    $scope.install.performInstallation = function(){
        $scope.manager.show="installProcess";
        sessionStorage.lastView="installProcess";
        sessionStorage.isInstalling =true;
        if (sessionStorage.isInstalling == true){
        checkInstall();
        }
        var path = $scope.AppFile;
        var file=$scope.AppFile.split('/');
        var app=file[file.length-1];
        var appSplit = app.split('.');
        var AppName = appSplit[0];
        var AppExtension = appSplit.slice(1,appSplit.length).join('');
        instProcess = management.install(path,AppName,$scope.install.pythonVersion);

        instProcessClose = instProcess.on('close', function(code){
                if (code !== 0) {
                    console.log('Installation exited with code ' + code);
                    logger.log('Installation exited with code ' + code);
                }else{
                    logger.log('Instalation complete');
                    console.log('Instalation complete');
                    return true;
                }

                });
        if (sessionStorage.isInstalling == true){
            checking = $timeout(checkInstall(),1000);
        }
    }



    $scope.launchApp = function(appName){
        console.log("launching app "+appName);
        var appChildProcess = management.launch(appName);
        $scope.manager.runningApps[appName] = appChildProcess;
        appChildProcess.stdout.on('data', function (data) {
            console.log('out: '+data);
            logger.log('out: '+data);
        });

        appChildProcess.stderr.on('data', function (data) {
            console.log('stderr: ' + data);
            logger.log('err: '+data);
        });
        appChildProcess.on('close', function (code) {
            if (code !== 0) {
                $scope.output="Error on startup";
                console.log($scope.output);
                console.log('Launch exited with code ' + code);
                logger.log('Launch exited with code ' + code);
            }else{
                console.log('Launch completed');
                logger.log('Launch completed');
            }
            $scope.manager.check();
        });

    }


    $scope.stopApp = function(appName){
        $scope.manager.runningApps.appName.kill('SIGHUP');
        delete runningApps.appName;
    }

});

management.initWorkspace();
console.log("Initialised");



})();

