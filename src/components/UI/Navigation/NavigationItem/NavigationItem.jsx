import React from "react";
import { NavLink } from "react-router-dom";
import classes from "./NavigationItem.module.css";

const NavigationItem = (props) => (
  <div className=' nav-item p-1'>
    <NavLink to={props.link} className={["nav-link",classes.element].join(' ')} activeClassName={classes.elementActive}>
      {props.children}
    </NavLink>
  </div>
);

export default NavigationItem;
