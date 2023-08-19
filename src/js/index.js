//import react into the bundle
import React from "react";
import ReactDOM from "react-dom";

// include your styles into the webpack bundle
import "../styles/index.css";

//import your own components
import Home from "./component/home.jsx";
import { Toaster } from "react-hot-toast";

//render your react application
ReactDOM.render(
  <>
    <Home />
    <Toaster position="bottom-center" />
  </>,
  document.querySelector("#app")
);
