import React from "react";
import PropTypes from "prop-types";
import InkPromise from "./ink-promise.js";

const promiseWrap = x => (x instanceof Promise ? x : Promise.resolve());

const InkPromiseFunction = React.memo(({func, args = [], ...props}) =>
  React.createElement(InkPromise, {
    promise: promiseWrap(func(...args)),
    ...props
  })
);

InkPromiseFunction.propTypes = {
  /// node function name
  func: PropTypes.func.isRequired,
  /// arguments sent to function
  args: PropTypes.array
};

export default InkPromiseFunction;
