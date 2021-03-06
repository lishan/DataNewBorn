'use strict';

/**
 * @ngdoc overview
 * @name basicApp
 * @description
 * # basicApp
 *
 * Main module of the application.
 */
angular
  .module('dataNewBorn', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'pascalprecht.translate',
    'ngFileUpload',
    "dndLists",
    'ui.bootstrap',
    'ui-notification',
    'angularSpinner',
    'ngCookies',
    'ui.select',
    'toggle-switch',
    'cfp.hotkeys',
    'ui.bootstrap.datetimepicker',
    'angularMoment',
    'ngTable',
    'angular-echarts',
    'angularjs-dropdown-multiselect'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/rfm.html',
        controller: 'RfmCtrl'
      })
      .when('/dashboard', {
        templateUrl: 'views/dashboard.html',
        controller: 'DashboardCtrl'
      })
      .when('/dataModel', {
        templateUrl: 'views/dataModel.html',
        controller: 'DataModelCtrl'
      })
      .when('/operation', {
        templateUrl: 'views/operation.html',
        controller: 'OperationCtrl'
      })
      .when('/rfm',{
        templateUrl: 'views/rfm.html',
        controller: 'RfmCtrl'
      })
      .when('/setting', {
        templateUrl: 'views/setting.html',
        controller: 'SettingCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  })
  .config(['NotificationProvider','usSpinnerConfigProvider', '$httpProvider', function (NotificationProvider, usSpinnerConfigProvider, $httpProvider) {
    NotificationProvider.setOptions({
      delay: 5000,
      startTop: 20,
      startRight: 10,
      verticalSpacing: 20,
      horizontalSpacing: 20,
      positionX: 'center',
      positionY: 'bottom'
    });
    usSpinnerConfigProvider.setDefaults({color: 'orange', radius: 20});
    $httpProvider.interceptors.push('UsInterceptor', 'UrlInterceptor');
  }])
  .constant('DEV_MODE', true)
  .run(function($rootScope, $location, $cookies) {
    $rootScope.logout = function(){
      $cookies.put("username", undefined);
      $location.path("/");
      $rootScope.tab = null;
    };
    $rootScope.init = (tab) => {
      let name = $cookies.get("username");
      // if(name === null || name === undefined){
      //   $rootScope.username = null;
      //   $rootScope.message = "请先登录";
      //   $rootScope.styles = "redBlock";
      //   $location.path("/");
      // }else {
      //   $rootScope.tab = tab;
      //   $rootScope.username = name;
      // }
    };
  });
