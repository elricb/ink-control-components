/*
 * Hook useInkPromise
 *
 * Turn Component into a promise
 *
 */
import {useState, useEffect} from "react";
import Defer from "../class/defer";
import getElement from "../function/get-element";

const defaultState = {
  status: null,
  reject: null,
  resolve: null,
  suspense: null,
  children: null
};

function useInkPromise({promise, children, resolve, reject, suspense, defer}) {
  const [state, setState] = useState(defaultState);

  if (process.env.DEBUG === true) {
    console.log("DEBUG", "useInkPromise");
  }

  useEffect(() => {
    if (!(promise && promise instanceof Promise)) {
      return;
    }

    setState({suspense});

    promise
      .then(mixed => {
        setState({
          ...defaultState,
          status: true,
          suspense: null,
          resolve: getElement(resolve, mixed) || null,
          children: children || null
          // children: getElement(children, mixed) || null
        });

        if (defer) {
          defer.then(mixed);
        }
      })
      .catch(error => {
        setState({
          ...defaultState,
          status: false,
          suspense: null,
          reject: getElement(reject, error) || null
        });

        if (typeof reject === "undefined") {
          defer.catch(error);
        }
      });
  }, [promise, children, resolve, reject, suspense, defer]);

  return state;
}

export default useInkPromise;
