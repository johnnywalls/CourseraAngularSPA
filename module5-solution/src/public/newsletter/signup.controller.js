(function () {

angular.module('public')
.controller('SignupController', SignupController);

SignupController.$inject = ['UserService','MenuService', 'user']
function SignupController(UserService, MenuService, user) {
  var reg = this;

  if (user) {
    reg.user = user;
  }

  reg.submit = function () {
    reg.invalid_favorite = false;
    if (reg.user.favoritemenu) {
      reg.user.favoritemenu = reg.user.favoritemenu.toUpperCase();
      var detail = MenuService.getMenuItem(reg.user.favoritemenu);
      detail.then(function(data){
        reg.user.menudetail = data;
        reg.completed = true;
        UserService.saveUserData(reg.user);
      })
      .catch(function(){
        reg.invalid_favorite = true;
      });
    }
    else {
      reg.completed = true;
      UserService.saveUserData(reg.user);
    }
  };
}

})();
