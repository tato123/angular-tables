'use strict';

/**
 * @ngdoc overview
 * @name angularTablesApp
 * @description
 * # angularTablesApp
 *
 * Main module of the application.
 */
angular
  .module('angularTablesApp', [
    'ngAnimate',
    'ngResource',
    'ngSanitize',
    'jsoft-table'
  ])

 .controller('mainCtrl', ['$scope', function($scope){
 	$scope.data = [
 		['one', 'two', 'three', 'four'],
 		['one', 'two', 'three', 'four'],
		['one', 'two', 'three', 'four'],
 	];


 }]);
