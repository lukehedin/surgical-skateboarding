app.directive('memberProfile', function() { 
  return { 
    restrict: 'E', 
    scope: { 
      profile: '=' 
    }, 
    templateUrl: 'memberProfile.html' 
  }; 
});