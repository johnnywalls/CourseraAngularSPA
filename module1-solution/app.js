(function () {
'use strict';

angular.module('LunchCheck', [])
.controller('LunchCheckController', LunchCheckController);

LunchCheckController.$inject = ['$scope'];

function LunchCheckController($scope) {
  $scope.checkLunchMenu = function() {
    var menu = $scope.lunchMenu;
    var errorMessage = 'Please enter data first';
    if ( menu === undefined || menu == '' ) {
      $scope.showMessage( errorMessage, 'danger' );
    }
    else {
      // split menu string and check for empty strings at once :)
      var menuItems = menu.split(',').filter(v => v.trim()!='');
      if (menuItems.length == 0) {
        $scope.showMessage( errorMessage, 'danger' );
      }
      else if (menuItems.length <= 3) {
        $scope.showMessage( 'Enjoy!', 'success' );
      }
      else {
        $scope.showMessage( 'Too much!', 'success' );
      }
    }
  };

  $scope.showMessage = function ( text, type ){
    $scope.message = text;
    $scope.contextClass = 'alert alert-'+type; // use bootstrap context classes
  };
}

})();
