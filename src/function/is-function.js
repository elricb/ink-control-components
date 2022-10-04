import {isValidElement} from "react";

const isFunction = function (test) {
  return typeof test === "function" && !isValidElement(test);
};

export default isFunction;
