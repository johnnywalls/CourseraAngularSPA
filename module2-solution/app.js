(function () {
'use strict';

angular.module('ShoppingListCheckOff', [])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService);

function ShoppingListCheckOffService() {
  var service = this;

  // pre-populated item list for items to buy
  var toBuyItems = [
    {name: "cookies", quantity: 10},
    {name: "chips", quantity: 2},
    {name: "soda", quantity: 5},
    {name: "tomatoes", quantity: 8},
    {name: "watermelons", quantity: 2},
    {name: "bananas", quantity: 9},
    {name: "apples", quantity: 12},
    {name: "oranges", quantity: 7}
  ];
  var boughtItems = [];

  service.buyItem = function (itemIndex) {
    var item = toBuyItems[itemIndex];
    boughtItems.push(item);
    toBuyItems.splice(itemIndex, 1);
  };

  service.getToBuyItems = function () {
    return toBuyItems;
  };

  service.getBoughtItems = function () {
    return boughtItems;
  };
}

ToBuyController.$inject = ['ShoppingListCheckOffService'];
function ToBuyController(ShoppingListCheckOffService) {
  var buy = this;

  buy.items = ShoppingListCheckOffService.getToBuyItems();

  buy.buyItem = function (itemIndex) {
    ShoppingListCheckOffService.buyItem(itemIndex);
  }
}

AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtController(ShoppingListCheckOffService) {
  var bought = this;

  bought.items = ShoppingListCheckOffService.getBoughtItems();
}

})();
