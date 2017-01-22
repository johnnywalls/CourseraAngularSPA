(function () {

angular.module('public')
.controller('InfoController', InfoController);

InfoController.$inject = ['user','ApiPath']
function InfoController(user, ApiPath) {
  var $ctrl = this;
  $ctrl.user = user;
  $ctrl.basePath = ApiPath;
}

})();
