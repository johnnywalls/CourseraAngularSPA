(function () {
'use strict';

angular.module('data')
.service('MenuDataService', MenuDataService)
.constant('ApiBase','https://davids-restaurant.herokuapp.com/');

MenuDataService.$inject = ['ApiBase', '$http']
function MenuDataService(ApiBase, $http) {
  var service = this;

  service.getAllCategories = function () {
    return $http({
      method: "GET",
      url: ApiBase + 'categories.json'
    });
  };

  service.getItemsForCategory = function (categoryShortName) {
    return $http({
      method: "GET",
      url: ApiBase + 'menu_items.json?category=' + categoryShortName
    });
  };
}

})();
