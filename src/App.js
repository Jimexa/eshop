import React from "react";
import "./App.css";
import { inject, observer } from "mobx-react";

import LoadScreen from "./components/loadScreen/LoadScreen";

const App = inject("shopStore")(
  observer(({ shopStore }) => {
    const { checkCart } = shopStore;
    checkCart();
    return (
      <div className="App">
        <h1>Welcome to our e-shop</h1>
        <h4>Please select the items you want to buy</h4>
        <LoadScreen />
      </div>
    );
  })
);

export default App;
