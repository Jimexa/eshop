import React, { Component } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";
import "./Items.css";
import { inject, observer } from "mobx-react";

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

const items = [
  { name: "Bike", price: 100 },
  { name: "Beer", price: 100 },
  { name: "Playstation4", price: 249 },
  { name: "Vacuum cleaner", price: 89 },
  { name: "Chair", price: 349 },
  { name: "Gum", price: 0.1 }
];

class Items extends Component {
  options = items.map(item => (
    <div className={"container"}>
      <FaMinus />
      <a style={{ marginLeft: 10, marginRight: 10 }}>{item.name}</a>
      <a style={{ marginRight: 10 }}>{item.price}</a>
      <FaPlus />
    </div>
  ));

  componentDidMount() {
    console.log(this.props.shopStore.total);
  }

  render() {
    return <div>{this.options}</div>;
  }
}

export default inject("shopStore")(observer(Items));
