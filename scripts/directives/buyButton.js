app.directive('buyButton', function(){
	return {
  	restrict: 'E',
  	scope: {},
  	templateUrl: 'buyButton.html',
    link: function(scope, element, attrs){
      	scope.addToCart = function(){
      		var lol = scope;
      		var lol2 = element;
      		var lollll = attrs;
      		debugger;
      	}
      }
    };
});