import React, { Component } from "react";
import { connect } from "react-redux";
export default (ChildComponent) => {
  class ComposedComponent extends Component {
    // comment just got rendered
    componentDidMount() {
      this.shouldNavigateAway();
    }

    // comment just got updated
    componentDidUpdate() {
      this.shouldNavigateAway();
    }

    shouldNavigateAway() {
      if (!this.props.auth) {
        // navigate back to home page if not sign in
        this.props.history.push("/");
      }
    }

    render() {
      return <ChildComponent {...this.props} />;
    }
  }

  const mapStateToProps = (state) => {
    return { auth: state.auth.authenticated };
  };

  return connect(mapStateToProps)(ComposedComponent);
};
