import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import Items from "../items/Items";

class LoadScreen extends Component {
  render() {
    const { loading } = this.props.shopStore;
    return <div>{loading ? null : <Items />}</div>;
  }
}

export default inject("shopStore")(observer(LoadScreen));
