import React, { Component } from "react";
import { connect } from "react-redux";
import { Route, Switch, Redirect } from "react-router-dom";
import SignIn from "./containers/SignIn/SignIn";
import Dashboard from "./containers/Dashboard/Dashboard";
import Layout from "./hoc/Layout/Layout";
import Products from "./containers/Products/Products";
import Stocks from "./containers/Stocks/Stocks";
import * as actionTypes from "./store/actions/index";
class Holder extends Component {
  state = {};
  componentDidMount() {
    this.props.onCheckAuthStatus();
  }
  render() {
    let layout = null;
    if (!this.props.authenticated) {
      layout = (
        <Switch>
          <Route path="/" exact component={SignIn} />
          <Redirect to="/" />
        </Switch>
      );
    }

    if (this.props.authenticated) {
      layout = (
        <Layout>
          <Switch>
            <Route path="/products" component={Products} />
            <Route path="/stocks"  component={Stocks} />
            <Route path="/dashboard" component={Dashboard} />
            <Redirect to={localStorage.getItem("path")} />
          </Switch>
        </Layout>
      );
    }

    return <React.Fragment>{layout}</React.Fragment>;
  }
}

const mapStateToProps = (state) => {
  return { authenticated: state.auth.authenticated };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onCheckAuthStatus: () => dispatch(actionTypes.authCheckStatus()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Holder);
