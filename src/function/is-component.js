import {isValidElement} from "react";

const isComponent = function (test) {
  return isValidElement(test) || Array.isArray(test);
};

export default isComponent;
