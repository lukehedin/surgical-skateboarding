app.directive('merchItem', function() { 
  return { 
    restrict: 'E', 
    scope: { 
      item: '=' 
    }, 
    templateUrl: 'merchItem.html' 
  }; 
});