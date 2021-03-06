// Check if a new cache is available on page load.
window.addEventListener('load', function(e) {

  window.applicationCache.addEventListener('updateready', function(e) {
    if (window.applicationCache.status == window.applicationCache.UPDATEREADY) {
      // Browser downloaded a new app cache.
      // Swap it in and reload the page to get the new hotness.
      window.applicationCache.swapCache();
      if (confirm('A new version of this site is available. Load it?')) {
        window.location.reload();
      }
    } else {
      // Manifest didn't changed. Nothing new to server.
    }
  }, false);

}, false);

var app = angular.module('myApp', []);

/* Key up event */

app.directive('onKeyupFn', function() {
    return function(scope, elm, attrs) {
        //Evaluate the variable that was passed
        //In this case we're just passing a variable that points
        //to a function we'll call each keyup
        var keyupFn = scope.$eval(attrs.onKeyupFn);
        elm.bind('keyup', function(evt) {
            //$apply makes sure that angular knows 
            //we're changing something
            scope.$apply(function() {
                keyupFn.call(scope, evt.which);
            });
        });
    };
});

/* Focus and blur events */

app.directive('ngFocus', ['$parse', function($parse) {
  return function(scope, element, attr) {
    var fn = $parse(attr['ngFocus']);
    element.bind('focus', function(event) {
      scope.$apply(function() {
        fn(scope, {$event:event});
      });
    });
  }
}]);
 
app.directive('ngBlur', ['$parse', function($parse) {
  return function(scope, element, attr) {
    var fn = $parse(attr['ngBlur']);
    element.bind('blur', function(event) {
      scope.$apply(function() {
        fn(scope, {$event:event});
      });
    });
  }
}]);

function masterCtrl($scope, $window, $http) {

  $scope.current_box = null;

  $scope.next_boxes = null;

  $scope.set_next_boxes = function($box) {
    if ($scope.current_box === null || $box != $scope.current_box) {
      $scope.current_box = $box
      $scope.next_boxes = $box.$then;
    } else {
      $scope.current_box = null;
      $scope.next_boxes = null;
    }
  }

  $scope.in_next_boxes = function($name) {
    if ($scope.current_box === null) return true;
    if ($name == $scope.current_box.name) return 'current';
    return ($scope.current_box == null || $scope.next_boxes.indexOf($name) > -1);
  }

	$scope.boxes = CONTENT;

  $scope.more_index = null;

  $scope.show_more = function($index) {
    $scope.more_index = $index;
  }
}
