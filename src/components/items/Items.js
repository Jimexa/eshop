import React from "react";
import { FaMinus, FaPlus } from "react-icons/fa";
import "./Items.css";
import { inject, observer } from "mobx-react";
import { Col, Row, Container } from "reactstrap";

let Parser = require("fast-xml-parser").j2xParser;
let defaultOptions = {
  attributeNamePrefix: "@_",
  attrNodeName: "@", //default is false
  textNodeName: "#text",
  ignoreAttributes: true,
  cdataTagName: "__cdata", //default is false
  cdataPositionChar: "\\c",
  format: false,
  indentBy: "  ",
  supressEmptyNode: false
};
let parser = new Parser(defaultOptions);
let xml = parser.parse({ make: "make", do: "do" });

const Items = inject("shopStore")(
  observer(({ shopStore }) => {
    let options = shopStore.itemList.map((item, index) => (
      <div className={"container"}>
        <FaMinus
          onClick={() => {
            shopStore.deleteItem(index);
            shopStore.calculateTotal();
          }}
        />
        <a style={{ marginLeft: 10, marginRight: 10 }}>{item.name}</a>
        <a style={{ marginRight: 10 }}>{item.price}$</a>
        <FaPlus
          onClick={() => {
            shopStore.addItem(index);
            console.log(shopStore.itemList);
            shopStore.calculateTotal();
          }}
        />
      </div>
    ));

    let cart = shopStore.cartItemList.map(cartitem => {
      if (cartitem.amount === 0) {
        return null;
      } else {
        return (
          <div className="container">
            <a>{cartitem.amount}</a>
            <a>{cartitem.name}</a>
          </div>
        );
      }
    });

    let { itemList } = shopStore;
    return (
      <div>
        {options}
        <h3>Cart</h3>
        {cart}
        <div>
          {!shopStore.discount ? (
            <div>Total: {shopStore.total} $</div>
          ) : (
            <div>
              <div style={{ textDecoration: "line-through" }}>
                Total: {shopStore.total} $
              </div>
              <div>New total: {shopStore.total * 0.9} $</div>
            </div>
          )}
        </div>
      </div>
    );
  })
);

export default Items;
