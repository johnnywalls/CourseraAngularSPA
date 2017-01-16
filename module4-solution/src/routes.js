(function () {
'use strict';

angular.module('MenuApp')
.config(RoutesConfig);

RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
function RoutesConfig($stateProvider, $urlRouterProvider) {

  // Redirect to home page if no other URL matches
  $urlRouterProvider.otherwise('/');

  // *** Set up UI states ***
  $stateProvider

  // Home page
  .state('home', {
    url: '/',
    templateUrl: 'src/templates/home.html'
  })

  // Categories list page
  .state('categories', {
    url: '/categories',
    templateUrl: 'src/templates/categories.html',
    controller: 'CategoriesController as $ctrl',
    resolve: {
      categories: ['MenuDataService', function (MenuDataService) {
        return MenuDataService.getAllCategories().then(function (result){
          return result.data;
        });
      }]
    }
  })

  .state('items', {
    url: '/category/{categoryId}/items',
    templateUrl: 'src/templates/items.html',
    controller: 'ItemsController as $ctrl',
    resolve: {
      items: ['$stateParams', 'MenuDataService',
            function ($stateParams, MenuDataService) {
              return MenuDataService.getItemsForCategory($stateParams.categoryId).then(function (result) {
                  return result.data;
              });
            }]
    }
  });

}

})();
