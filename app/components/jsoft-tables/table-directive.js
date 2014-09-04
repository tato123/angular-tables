
angular.module('jsoft-table', ['jsoft-table.directive']);

/**
*  Module
*
* Description
*/
angular.module('jsoft-table.directive', [])


.directive('angularTable', [ function(){

	

	// Runs during compile
	return {
		restrict: 'E',
		transclude: true,
		replace: true,
		scope: {
			tableDatasource: '='
		},
		templateUrl: 'components/jsoft-tables/table.html',
		link: function($scope, element, attrs) 
		{
			$scope.entries = $scope.tableDatasource || [];

			$scope.$watch('tableDatasource', function(value)
			{
				$scope.entries = value;
			});
		},
		controller: ['$scope', function($scope)
		{
			$scope.header;
			$scope.table = [];
			

			this.setHeader = function(header)
			{
				$scope.header = header;
			}

			this.addRow = function(row, animated)
			{
				$scope.table.push(row);
			}
		}]
	};
}])

.directive('angularHeader', [ function(){
	// Runs during compile
	return {
		restrict: 'E',
		require: '^angularTable',
		template: '<div class="row-fluid angular-table-header" ng-transclude></div>',
		transclude: true,
		replace: true,
		link: function($scope, element, attrs, tableCtrl) {
			tableCtrl.setHeader($scope);
		}
	};
}])

.directive('angularEntry', ['$compile', function($compile){
	var templateSt = '<angular-column>';
	var templateEnd = '</angular-column>';
	// Runs during compile
	return {
		restrict: 'E',
		require: '^angularTable',
		template: '<div class="row row-fluid angular-table-entry" ng-transclude></div>',
		transclude: true,
		replace: true,
		scope: {
			columns: '='
		},
		link: function($scope, element, attrs, tableCtrl) 
		{
			$(element).hide();

			tableCtrl.addRow($scope);

			angular.forEach($scope.columns, function(item)
			{
				var data = templateSt + item + templateEnd;
				element.append(data)
			});

			var childScope = $scope.$new();

			$compile(element.contents())(childScope);

			$(element).fadeIn('slow');

			

			$(element).on('mouseover', function()
			{
				$(this).addClass('hover');
			});
			
			$(element).on('mouseout', function()
			{
				$(this).removeClass('hover');
			});
		},
		controller : ['$scope', function($scope)
		{

		}]
	};
}])

.directive('angularColumn', [ function(){
	// Runs during compile
	return {
		restrict: 'E',
		template: '<div class="col-sm-3 angular-entry-col" ng-transclude></div>',
		transclude: true,
		replace: true,
		link: function($scope, element, attrs, tableCtrl) {
			
		}
	};
}]);