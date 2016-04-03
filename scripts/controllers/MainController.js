app.controller('MainController', ['$scope', function($scope) {

  $scope.loremIpsum = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut tincidunt, tortor eu viverra condimentum, leo ipsum varius nibh, non fermentum lacus eros et lorem. Donec a felis ut massa fringilla dapibus. Suspendisse consectetur maximus malesuada. In elementum ut neque non suscipit. Pellentesque ac maximus enim. Phasellus rhoncus turpis sit amet lacinia tempor. Vivamus eu massa urna. Quisque ligula neque, cursus sed ipsum sit amet, finibus semper est. Suspendisse rhoncus tortor nisl, ornare ultrices velit mattis a. Suspendisse sapien arcu, euismod vel molestie a, bibendum sit amet elit. Phasellus interdum tortor eu ligula mattis, a auctor lacus vehicula. Morbi lectus nulla, tempor eget arcu vel, ultricies vestibulum lectus. Interdum et malesuada fames ac ante ipsum primis in faucibus."

    // Member Profiles
  $scope.memberProfiles = [{
    icon: 'images/ss_member1.jpg',
    title: 'President',
    name: 'Sarah "Sick" Smith (Neurosurgeon)',
    description: $scope.loremIpsum
  }, {
    icon: 'images/ss_member2.jpg',
    title: 'Secretary',
    name: 'Alex "All-Star" Anderson (Postgraduate)',
    description: $scope.loremIpsum
  }, {
    icon: 'images/ss_member3.jpg',
    title: 'Treasurer',
    name: 'Benji "Boarder" Benson (Neurosurgeon)',
    description: $scope.loremIpsum
  }, {
    icon: 'images/ss_member4.jpg',
    title: 'Event Co-ordinator',
    name: 'Katy "Kool" Kristian (Undergraduate)',
    description: $scope.loremIpsum
  }, {
    icon: 'images/ss_member5.jpg',
    title: 'Marketing',
    name: 'Dave "Deck" Dewford (Undergraduate)',
    description: $scope.loremIpsum
  }];

  $scope.activeProfile = $scope.memberProfiles[0];

  $scope.setActiveProfile = function(profileName){
    var newActiveProfile = null;

    //Getting profiles by name, because this isn't extreme data. Normally I'd use an ID. Don't judge me.
    $scope.memberProfiles.forEach(function(profile){
      if(profile.name === profileName){
        newActiveProfile = profile;
      }
    });

    if( $scope.activeProfile !== newActiveProfile) $scope.fadeProfile(newActiveProfile);
  };

  $scope.fadeProfile = function(newActiveProfile){
    var activeProfileDiv = $('.active-member-profile-container');

    activeProfileDiv.fadeOut("fast", function(){
      $scope.activeProfile = newActiveProfile;
      // We need to do a manual update of the scope/view
      $scope.$apply();
      activeProfileDiv.fadeIn("fast");
    });
  };

  // Merchandise Items
  $scope.merchItems = [{
    icon: 'images/ss_board.jpg',
    title: '"Surgeons Shred!" Skateboard',
    description: 'Limited edition "Surgeons Shred!" skateboard. Slogan printed in Japanese. Slogan definitely says "Surgeons Shred!", as far as we know. It is definitley not English.',
    price: 29.99
  }, {
    icon: 'images/ss_halfboard.jpg',
    title: 'Destroyed Board',
    description: 'Skateboard that has been authentically destroyed by a legit suregon. Surgeons usually help fix things, not break them. What a riot of a gift this could be!',
    price: 9.99
  }, {
    icon: 'images/ss_print.jpg',
    title: 'Skating Surgeon Print',
    description: 'Fine-quality print of some surgeon skaters out shreddin\'! We were assured by the photographer (via text message) that the youths in the print have legit medical degrees.',
    price: 24.99
  }, {
    icon: 'images/ss_mask.jpg',
    title: 'Skater Surgery Mask',
    description: 'This is actually just a standard-issue medical mask, but we will mail it out to you at triple the cost, no problem. Single-use only.',
    price: 6.99
  }];

}]);