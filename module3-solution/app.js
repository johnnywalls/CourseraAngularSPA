(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.constant('ApiMenuItems','https://davids-restaurant.herokuapp.com/menu_items.json')
.directive('foundItems', FoundItemsDirective);

function FoundItemsDirective() {
  var ddo = {
    restrict: 'E',
    templateUrl: 'foundItems.html',
    scope: {
      foundItems: '<',
      onRemove: '&',
      status: '<'
    }
  };

  return ddo;
}


MenuSearchService.$inject = ['$http', 'ApiMenuItems'];
function MenuSearchService($http, ApiMenuItems) {
  var service = this;

  service.getMatchedMenuItems =  function(searchTerm) {
    return $http({
      method: "GET",
      url: ApiMenuItems
    })
    .then(function (result) {
      // process result and only keep items that match
      var allItems = result.data.menu_items;
      var foundItems = [];
      for (var i=0; i < allItems.length; i++) {
        if ( allItems[i].name.toLowerCase().indexOf(searchTerm.toLowerCase()) != -1 ) {
          foundItems.push(allItems[i]);
        }
      }
      // return processed items
      return foundItems;
    });
  };

}

NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
  var search = this;

  search.found = [];
  search.status = '';

  search.getMatchedMenuItems = function(searchTerm) {
    if (searchTerm && searchTerm!='') {
      search.status = 'loading';
      MenuSearchService.getMatchedMenuItems(searchTerm)
      .then( function(result) {
        search.found = result;
        search.status = 'done';
      });
    }
    else {
      search.found = [];
      search.status = 'done';
    }
  };

  search.removeItem = function (index) {
    search.found.splice(index,1);
  };
}

})();
