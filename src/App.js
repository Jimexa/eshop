import React from "react";
import "./App.css";

import Items from "./components/items/Items";

function App() {
  return (
    <div className="App">
      <h1>Welcome to our e-shop</h1>
      <h4>Please select the items you want to buy</h4>
      <Items />
    </div>
  );
}

export default App;
