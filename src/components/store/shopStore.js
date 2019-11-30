import { observable, decorate, autorun } from "mobx";
import { persist, create } from "mobx-persist";

class ShopStore {
  value1 = 1;
  total = 2;
  itemList = [];
}
decorate(ShopStore, {
  value1: [persist("object"), observable],
  total: observable,
  itemList: observable
});

const hydrate = create({ storage: localStorage, jsonify: false });

const store = (window.store = new ShopStore());

export default store;

hydrate("shopStore", store).then(() => console.log("store has been hydrated"));
