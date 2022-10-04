/*
 * InkPromiseSynchronous
 *
 * Run all child Components (InkPromise compatible) sequentially
 *
 */
import React from "react";
import PropTypes from "prop-types";
import {Defer} from "../class/index";
import getElement from "../function/get-element";

const InkPromiseSynchronous = props => {
  const [index, setIndex] = React.useState(0);
  const [children, setChildren] = React.useState([]);
  const [state, setState] = React.useState({
    reject: null,
    resolve: null,
    suspense: props?.suspense || null
  });

  React.useEffect(() => {
    if (!("children" in props)) {
      return;
    }

    if (!Array.isArray(props.children)) {
      const defer = new Defer();

      defer.promise
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

      setChildren([React.cloneElement(props.children, {defer})]);

      return;
    }

    if (index === React.Children.count(props.children)) {
      setState({resolve: getElement(props.resolve), suspense: null});

      return;
    }

    const defer = new Defer();

    defer.promise
      .then(() => {
        setIndex(index + 1);
      })
      .catch(error => {
        setState({
          reject: getElement(props.reject, error) || null,
          resolve: null,
          suspense: null
        });
      });

    setChildren([
      ...children,
      React.cloneElement(props.children[index], {key: index, defer})
    ]);
  }, [index]);

  return React.createElement(
    React.Fragment,
    null,
    state.reject,
    state.resolve,
    state.suspense,
    children
  );
};

InkPromiseSynchronous.propTypes = {
  /// Element, array or function that optionally returns display Element
  resolve: PropTypes.any,
  /// Element, array or function that optionally returns display Element
  reject: PropTypes.any,
  /// Element or array
  suspense: PropTypes.any,
  /// Element, array or function that optionally returns display Element
  children: PropTypes.any
};

export default InkPromiseSynchronous;
