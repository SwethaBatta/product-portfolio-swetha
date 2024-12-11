import { Outlet } from "react-router-dom";
import React from "react";
import Summary from "./components/Summary";
import "./components/index.css";

function App() {
  return (
    <div className="App">
      <>
        <Summary />
        <Outlet />
      </>
      </div>
  );
}
export default App;
