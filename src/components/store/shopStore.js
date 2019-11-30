import { observable, decorate, autorun } from "mobx";

class ShopStore {
  value1 = 1;
  total = 2;
  itemList = [];
}
decorate(ShopStore, {
  value1: observable,
  total: observable,
  itemList: observable
});

let store = (window.store = new ShopStore());

export default store;

// autorun(() => {
//   console.log(store.value1);
//   console.log(store.total);
// });
