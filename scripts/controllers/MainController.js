app.controller('MainController', ['$scope', function($scope) {
  
  createData();

  // Home
  $scope.setActiveProfile = function(profileName, isAuto){
    var newActiveProfile = null;

    //Getting profiles by name, because this isn't extreme data. Normally I'd use an ID. Don't judge me.
    $scope.memberProfiles.forEach(function(profile){
      if(profile.name === profileName){
        newActiveProfile = profile;
      }
    });

    if($scope.activeProfile !== newActiveProfile) $scope.fadeProfile(newActiveProfile);
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

  // Groups
  $scope.groupsMap;

  $scope.setSelectedGroup = function(selectedGroup, requiresApply){
    if(selectedGroup){
      $scope.groupsMap.setCenter(new google.maps.LatLng(selectedGroup.groupLat, selectedGroup.groupLong));
      $scope.groupsMap.setZoom(11);

      if(selectedGroup !== $scope.selectedSkateGroup) $scope.selectedSkateGroup = selectedGroup;
    } else{
      $scope.groupsMap.setCenter($scope.mapDefaults.center);
      $scope.groupsMap.setZoom($scope.mapDefaults.zoom);

      $scope.selectedSkateGroup = null;
    }

    if(requiresApply) $scope.$apply();
  };

  $scope.mapDefaults = {
    center: {lat: -37.815112, lng: 144.960909},
    zoom: 10
  };

  $scope.initMap = function(mapContainerEl) {
   $scope.groupsMap = new google.maps.Map(mapContainerEl, $scope.mapDefaults);

    $scope.fetchGroupMarkers()
  };

  $scope.fetchGroupMarkers = function(){
    $scope.skateGroups.forEach(function(skateGroup){
      var marker = new google.maps.Marker({
        position: new google.maps.LatLng(skateGroup.groupLat, skateGroup.groupLong),
        title: skateGroup.title
      });

      var radiusCircle = new google.maps.Circle({
        map: $scope.groupsMap,
        radius: skateGroup.groupRadius, //2km

        fillColor: '#66ffb3',
        strokeColor: '#00cc66',
        strokeWeight: 2
      });

      radiusCircle.bindTo('center', marker, 'position');

      google.maps.event.addListener(radiusCircle, 'click', function(){
        $scope.setSelectedGroup(skateGroup, true);
      });
    });
  };

  //Events
  var threeMonthsAhead = new Date();
  threeMonthsAhead.setMonth(threeMonthsAhead.getMonth() + 3);

  var sortByDate = function(e1, e2){ return e1.date > e2.date; };

  $scope.getUpcomingEvents = function(){
   return $scope.events.filter(function(event){
      return event.date < threeMonthsAhead;
    }).sort(sortByDate);
  };

  $scope.getOtherEvents = function(){
   return $scope.events.filter(function(event){
      return event.date > threeMonthsAhead;
    }).sort(sortByDate);
  };

  // Merchandise
  $scope.addToCart = function(item){
    var alreadyInCart = false;
    $scope.itemsInCart.forEach(function(cartItem){
      if(item.id === cartItem.id){
        cartItem.quantity++;
        alreadyInCart = true;
      }
    });

    if(!alreadyInCart){
      item.quantity = 1;
      $scope.itemsInCart.push(item);
    } 
  };

  function createData(){
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

    // Merchandise
    $scope.itemsInCart = [];

    $scope.merchItems = [{
      id: 1,
      icon: 'images/ss_board.jpg',
      title: '"Surgeons Shred!" Skateboard',
      description: 'Limited edition "Surgeons Shred!" skateboard. Slogan printed in Japanese. Slogan definitely says "Surgeons Shred!", as far as we know. It is definitley not English.',
      price: 29.99
    }, {
      id: 2,
      icon: 'images/ss_halfboard.jpg',
      title: 'Destroyed Board',
      description: 'Skateboard that has been authentically destroyed by a legit suregon. Surgeons usually help fix things, not break them. What a riot of a gift this could be!',
      price: 9.99
    }, {
      id: 3,
      icon: 'images/ss_print.jpg',
      title: 'Skating Surgeon Print',
      description: 'Fine-quality print of some surgeon skaters out shreddin\'! We were assured by the photographer (via text message) that the youths in the print have legit medical degrees.',
      price: 24.99
    }, {
      id: 4,
      icon: 'images/ss_mask.jpg',
      title: 'Skater Surgery Mask',
      description: 'This is actually just a standard-issue medical mask, but we will mail it out to you at triple the cost, no problem. Single-use only.',
      price: 6.99
    }];

    // Groups
    $scope.selectedSkateGroup;

    $scope.skateGroups = [{
        groupLat: -37.806820,
        groupLong: 145.031007,
        groupRadius: 2000,
        title: 'Kickflip Kewtonians',
        description: $scope.loremIpsum
    }, {
        groupLat: -37.786461,
        groupLong: 144.831940,
        groupRadius: 4000,
        title: 'Sunshine Surgeons',
        description: $scope.loremIpsum
    }, {
        groupLat: -37.802968,
        groupLong: 144.950113,
        groupRadius: 2000,
        title: '180 Surgeons North Melbourne',
        description: $scope.loremIpsum
    }, {
        groupLat: -37.697060,
        groupLong: 145.059002,
        groupRadius: 3000,
        title: 'Freestylin\' Bundoora',
        description: $scope.loremIpsum
    }];

    var getThisOrNextYear = function(month, day){
      var today = new Date();
      var nextYear = new Date();
      nextYear.setYear(nextYear.getFullYear() + 1);

      //Makes sure the events are eternally in the future
      var proposedDate = new Date(today.getFullYear(), month, day);
      if(proposedDate < today) proposedDate.setYear(nextYear.getFullYear());

      return proposedDate;
    };

    // Events
    $scope.events = [{
      title: 'Night Skate Meet',
      date: getThisOrNextYear(5, 15),
      location: 'Melbourne Town Hall',
      description: $scope.loremIpsum,
      organisedBy: 'Surgical Skateboarding',
      icon: 'images/ss_event1.jpg'
    }, {
      title: 'Beach Trip',
      date: getThisOrNextYear(6, 22),
      location: 'Torquay',
      description: $scope.loremIpsum,
      organisedBy: $scope.skateGroups[1].title,
      icon: 'images/ss_event2.jpg'
    }, {
      title: 'Costume Party - Traditional',
      date: getThisOrNextYear(1, 14),
      location: 'Fed Square',
      description: $scope.loremIpsum,
      organisedBy: 'Surgical Skateboarding',
      icon: 'images/ss_event3.jpg'
    }, {
      title: 'Skate Doggy Meetup',
      date: getThisOrNextYear(3, 27),
      location: 'Flagstaff Gardens',
      description: $scope.loremIpsum,
      organisedBy: $scope.skateGroups[3].title,
      icon: 'images/ss_event4.jpg'
    }, {
      title: 'NYE Meetup',
      date: getThisOrNextYear(11, 31),
      location: 'Southbank',
      description: $scope.loremIpsum,
      organisedBy: 'Surgical Skateboarding',
      icon: 'images/ss_event5.jpg'
    }, {
      title: 'Study Meetup',
      date: getThisOrNextYear(9, 11),
      location: 'State Library',
      description: $scope.loremIpsum,
      organisedBy: $scope.skateGroups[2].title,
      icon: 'images/ss_event6.jpg'
    }, {
      title: 'East Casual Comp',
      date: getThisOrNextYear(10, 13),
      location: 'Kew Junction',
      description: $scope.loremIpsum,
      organisedBy: $scope.skateGroups[2].title,
      icon: 'images/ss_event7.jpg'
    }]

    //Faqs
    $scope.faqs = [{
      q: 'Where are you based?',
      a: 'We are spread out accross multiple surburbs in Melbourne, Australia. We hope to expand our community and brand to other cities in the country in the near future.'
    }, {
      q: 'I\'m not a qualified surgeon, can I join?',
      a: 'Yes, though certain restrictions apply. To attend our networking events you must be in a medical profession or studying to join the medical profession. Most other events welcome everyone!' 
    }, {
      q: 'I can\'t purchase items from your merchandise page! What is wrong with it?',
      a: 'Our merchandise page is currently undergoing eternal faux-maintenance. If you want real Surgical Skate merchandise, you might have to look on the dark web.'
    }];
  };
}]);

// Groups map
function initMap(){
    var mapContainerEl = $('.groups-google-map')[0];
    var scope = angular.element(mapContainerEl).scope();
    if(scope) scope.initMap(mapContainerEl);
};