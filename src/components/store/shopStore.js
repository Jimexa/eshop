import { observable, decorate, action } from "mobx";
import { persist, create } from "mobx-persist";

class ShopStore {
  total = 0;
  itemList = [
    { name: "Mik", price: 1.5 },
    { name: "Beer", price: 2 },
    { name: "Bucket", price: 10 },
    { name: "1 Kg Blue cheese", price: 21 },
    { name: "1 Kg Feta", price: 8.5 },
    { name: "Gum", price: 0.1 }
  ];
  cartItemList = [];
  loading = true;
  discount = false;

  addItem = index => {
    this.cartItemList[index].amount = this.cartItemList[index].amount + 1;
    console.log(this.cartItemList[index].amount, this.cartItemList[index].name);
  };

  deleteItem = index => {
    if (this.cartItemList[index].amount !== 0) {
      this.cartItemList[index].amount--;
    } else {
      alert(
        `Cannot remove a ${this.cartItemList[index].name} from the basket since there aren't any`
      );
    }
  };

  calculateTotal = () => {
    let sum = 0;
    this.cartItemList.forEach(item => {
      sum = sum + item.amount * item.price;
    });
    if (sum > 100) {
      this.discount = true;
    } else {
      this.discount = false;
    }
    this.total = sum;
    console.log(sum);
  };

  createCart = () => {
    this.cartItemList = this.itemList.map(item => {
      let obj = item;
      obj.amount = 0;
      return obj;
    });
  };
}

decorate(ShopStore, {
  loading: observable,
  total: [persist("object"), observable],
  itemList: [observable],
  cartItemList: [persist("list"), observable],
  addItem: action,
  createCart: action,
  calculateTotal: action
});

const hydrate = create();

const store = (window.store = new ShopStore());

export default store;

hydrate("shopStore", store).then(() => {
  console.log("store has been hydrated");
  store.loading = false;
});
