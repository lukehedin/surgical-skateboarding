app.directive('memberButton', function(){
	return {
  	restrict: 'E',
  	scope: {
  		profile: '=' 
  	},
  	templateUrl: 'memberButton.html'
   };
});