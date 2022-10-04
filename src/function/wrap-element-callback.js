import isFunction from "./is-function";

const wrapElementCallback = function (f, container, child) {
  if (typeof container === "undefined" && typeof child === "undefined") {
    return undefined;
  }

  return function (mixed) {
    f(mixed);
    if (isFunction(child)) {
      child(mixed);

      return;
    }

    return child;
  };
};

export default wrapElementCallback;
