/**
 * Routes
 */
angular.module('AioCamera').config([
    '$routeProvider',
    'VIEW_PATH',
    function($routeProvider, VIEW_PATH) {
        // Recorder view
        $routeProvider.when('/', {
            templateUrl  : VIEW_PATH + '/recorder.html',
            controller   : 'RecorderController',
            controllerAs : 'recorderCtrl'
        });

        // Parameters view
        $routeProvider.when('/parameters', {
            templateUrl  : VIEW_PATH + '/parameters.html',
            controller   : 'ParametersController',
            controllerAs : 'parametersCtrl'
        });

        // Records view
        $routeProvider.when('/records', {
            templateUrl  : VIEW_PATH + '/records.html',
            controller   : 'RecordsController',
            controllerAs : 'recordsCtrl'
        });
    }
]);