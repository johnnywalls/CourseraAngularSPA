(function () {
'use strict';

angular.module('LunchCheck', [])
.controller('LunchCheckController', LunchCheckController);

LunchCheckController.$inject = ['$scope'];

function LunchCheckController($scope) {
  $scope.checkLunchMenu = function() {
    // split menu string and check for empty strings =)
    var menu = $scope.lunchMenu;
    var data_error_message = 'Please enter data first';
    if ( menu === undefined || menu == '' ) {
      $scope.showMessage( data_error_message, 'danger' );
    }
    else {
      var menuItems = menu.split(',').filter(v => v.trim()!='');
      if (menuItems.length == 0) {
        $scope.showMessage( data_error_message, 'danger' );
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
    $scope.contextClass = 'alert alert-'+type;
  };
}

})();
