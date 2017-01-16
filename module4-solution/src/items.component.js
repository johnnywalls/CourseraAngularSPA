(function () {
'use strict';

angular.module('MenuApp')
.component('items', {
  templateUrl: 'src/templates/items.html',
  bindings: {
    items: '<',
    category: '<'
  }
});

})();
