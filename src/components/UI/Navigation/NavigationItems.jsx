import React from "react";
import NavigationItem from "./NavigationItem/NavigationItem";

function NavigationItems(props) {
  return (
    <div className={["nav nav-pills mb-2 nav-justified flex-column flex-sm-row"]}>
      <NavigationItem link="/dashboard">Dashboard</NavigationItem>
      <NavigationItem link="/accounts">accounts</NavigationItem>
      <NavigationItem link="/bills">bills</NavigationItem>
      <NavigationItem link="/stocks">stock</NavigationItem>
      <NavigationItem link="/products">Products</NavigationItem>
      <button
        onClick={props.logout}
        className="btn m-1 btn-outline-dark nav-item p-1"
      >
        LOG OUT
      </button>
    </div>
  );
}

export default NavigationItems;
