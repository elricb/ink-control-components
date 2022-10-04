/*
 * InkPromise
 *
 * Component as a promise
 *
 */
import React from "react";
import PropTypes from "prop-types";
import {Defer} from "../class/index";
import useInkPromise from "../hook/use-ink-promise";

const InkPromise = React.memo(function (props) {
  const state = useInkPromise(props);

  if (process.env.DEBUG === true) {
    console.log("DEBUG", "InkPromise");
  }

  return React.createElement(
    React.Fragment,
    null,
    state.reject,
    state.resolve,
    state.children,
    state.suspense
  );
});

InkPromise.propTypes = {
  /// The promise
  promise: PropTypes.instanceOf(Promise).isRequired,
  /// Element, array or function that optionally returns display Element
  resolve: PropTypes.any,
  /// Element, array or function that optionally returns display Element
  reject: PropTypes.any,
  /// Element or array
  suspense: PropTypes.any,
  /// Element, array or function that optionally returns display Element
  children: PropTypes.any,
  /// Defer class from container component
  defer: PropTypes.instanceOf(Defer)
};

export default InkPromise;
