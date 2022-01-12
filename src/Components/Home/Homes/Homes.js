import React from "react";
import Footer from "../../Footer/Footer";
import Home from "../Home";
import SubscribeBox from "../../Footer/SubscribeBox/SubscribeBox";

const Homes = () => {
  return (
    <header className="header-container">
      <Home></Home>
      <SubscribeBox></SubscribeBox>
      <Footer></Footer>
    </header>
  );
};

export default Homes;
