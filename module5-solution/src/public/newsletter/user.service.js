(function () {
'use strict';

angular.module('public')
.service('UserService', UserService);

UserService.$inject = [];
function UserService() {
  var service = this;

  service.userData = undefined;

  service.saveUserData = function (userData) {
    service.userData = userData;
  };

  service.getUserData = function () {
    return service.userData;
  };

  service.clearUserData = function () {
    service.userData = undefined;
  };
}

})();
