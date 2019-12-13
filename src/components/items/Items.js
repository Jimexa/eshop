import React from "react";
import { FaMinus, FaPlus, FaShoppingCart } from "react-icons/fa";
import "./Items.css";
import { inject, observer } from "mobx-react";
import { Col, Row, Container, Button } from "reactstrap";

const Items = inject("shopStore")(
  observer(({ shopStore }) => {
    shopStore.calculateTotal();
    const buy = () => {
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
      let xmlList = shopStore.cartItemList.map(item =>
        item.amount === 0 ? null : item
      );
      let filtered = xmlList.filter(function(el) {
        return el != null;
      });
      let xml = parser.parse(filtered);
      console.log("BUY", xml);
    };

    let options = shopStore.itemList.map((item, index) => (
      <Row key={index}>
        <Col className="plusMinus" xs="1">
          <FaMinus
            onClick={() => {
              shopStore.deleteItem(index);
              shopStore.calculateTotal();
            }}
          />
        </Col>
        <Col>{item.name}</Col>
        <Col xs="1" style={{ marginRight: 10 }}>
          {item.price}$
        </Col>
        <Col className="plusMinus" xs="1">
          <FaPlus
            onClick={() => {
              shopStore.addItem(index);
              console.log(shopStore.itemList);
              shopStore.calculateTotal();
            }}
          />
        </Col>
      </Row>
    ));

    let cart = shopStore.cartItemList.map((cartitem, index) => {
      if (cartitem.amount === 0) {
        return null;
      } else {
        return (
          <Row key={index}>
            <Col xs="2"></Col>
            <Col xs="1">{cartitem.amount}</Col>
            <Col>{cartitem.name}</Col>
            <Col xs="2"></Col>
          </Row>
        );
      }
    });

    return (
      <Container>
        <Row>
          <Col>{options}</Col>
          <Col>
            <Row noGutters={true}>
              <h3 style={{ marginLeft: "30%" }}>Cart</h3>
              <FaShoppingCart size="30" />
            </Row>
            <div className="cart">{cart}</div>

            <div>
              {!shopStore.discount ? (
                <div>Total: {shopStore.total} $</div>
              ) : (
                <div>
                  <div style={{ textDecoration: "line-through" }}>
                    Total: {shopStore.total.toFixed(2)} $
                  </div>
                  <div>New total: {shopStore.total.toFixed(2) * 0.9} $</div>
                </div>
              )}
            </div>
            <Button
              style={{ marginTop: "5%" }}
              onClick={() => {
                buy();
              }}
            >
              BUY
            </Button>
          </Col>
        </Row>
      </Container>
    );
  })
);

export default Items;
