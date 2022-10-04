/*
 * InkPromiseAsynchronous
 *
 * Run all child Components listening for resolution
 *
 */
import React from "react";
import PropTypes from "prop-types";

import Defer from "../class/defer";
import getElement from "../function/get-element";

const InkPromiseAsynchronous = props => {
  const [children, setChildren] = React.useState([]);
  const [state, setState] = React.useState({
    reject: null,
    resolve: null,
    suspense: props.suspense || null
  });

  React.useEffect(() => {
    if (!props.children) {
      return;
    }

    const promises = [];
    const children = React.Children.map(
      Array.isArray(props.children) ? props.children : [props.children],
      child => {
        const defer = new Defer();
        promises.push(defer.promise);

        return React.cloneElement(child, {defer});
      }
    );

    Promise.all(promises)
      .then(() => {
        setState({resolve: getElement(props.resolve), suspense: null});
      })
      .catch(error => {
        setState({
          reject: getElement(props.reject, error) || null,
          resolve: null,
          suspense: null
        });
      });

    setChildren(children);
  }, [props.children]);

  return React.createElement(
    React.Fragment,
    null,
    state.reject,
    state.resolve,
    state.suspense,
    children
  );
};

InkPromiseAsynchronous.propTypes = {
  /// Element, array or function that optionally returns display Element
  resolve: PropTypes.any,
  /// Element, array or function that optionally returns display Element
  reject: PropTypes.any,
  /// Element or array
  suspense: PropTypes.any,
  /// Element, array or function that optionally returns display Element
  children: PropTypes.any
};

export default InkPromiseAsynchronous;
