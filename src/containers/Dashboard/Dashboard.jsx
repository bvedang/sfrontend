import React, { Component } from "react";
import Charts from "../../components/Charts/Charts";
import classes from "./Dashboard.module.css";
class Dashboard extends Component {
  state = {};
  componentDidMount() {
    localStorage.setItem("path", window.location.pathname);
  }
  render() {
    return (
      <React.Fragment>
        <div className="col-sm mt-2">
          <div className="row">
            <div className={["col-sm-8", classes.Graphdiv].join(" ")}>
              <Charts />
            </div>
            <div className={["col-sm-3", classes.Infodiv].join(" ")}>
              <p className="text-center">Hello</p>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Dashboard;
