import React, { Component } from "react";
import { connect } from "react-redux";
import * as actionTypes from "../../store/actions/index";
import Toolbar from "../../components/UI/Navigation/Toolbar/Toolbar";

class Layout extends Component {
  state = {};

  render() {
    return (
      <React.Fragment>
        <Toolbar logout={this.props.onLogout}/>
        <main>{this.props.children}</main>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
      authenticated: state.authenticated
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onLogout: () => dispatch(actionTypes.authenticationLogout()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
