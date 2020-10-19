import React from "react";
import NavigationItems from "../NavigationItems";
import { Divider } from "@material-ui/core";

const toolbar = (props) => (
  <div className="justify-content-center p-2">
    <NavigationItems logout={props.logout} />
    <Divider variant="fullWidth" />
  </div>
);

export default toolbar;
