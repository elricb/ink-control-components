import isFunction from "./is-function";

const getElement = function (fc, arg) {
  return isFunction(fc) ? fc(arg) : fc;
};

export default getElement;
