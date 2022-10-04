/*
 * ErrorBoundary
 *
 * Display/run reject prop
 *
 */
import React from "react";
import PropTypes from "prop-types";
import getElement from "../function/get-element";

class ErrorBoundary extends React.Component {
  state = {hasError: false};

  static getDerivedStateFromError(error) {
    console.log("DEBUG", error.toString());
    return {
      error,
      hasError: true,
      Component: getElement(this.props.reject, error)
    };
  }

  componentDidCatch(error, errorInfo) {
    console.log("DEBUG", "caughterr");
  }

  render() {
    //if (this.state.hasError && !this.props.reject) {
    //  throw this.state.error;
    //}

    return React.createElement(
      React.Fragment,
      null,
      this.props.children || null,
      (this.state.hasError && this.state.Component) || null
    );
  }
}

ErrorBoundary.propTypes = {
  reject: PropTypes.any
};

export default ErrorBoundary;
