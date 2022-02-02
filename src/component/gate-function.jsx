import React from "react";
import PropTypes from "prop-types";

const GateFunction = ({func, children, args = [], gateFalse = null}) => {
  const [result, setResult] = React.useState(null);

  React.useEffect(() => {
    const mixed = func(...args);
    if (mixed !== result) {
      setResult(mixed);
    }
  }, [func, args]);

  if (result === null) {
    return null;
  }

  return result ? children || null : gateFalse;
};

GateFunction.propTypes = {
  /// function that returns boolean result
  func: PropTypes.func.isRequired,
  /// args sent to the function
  args: PropTypes.array,
  children: PropTypes.any,
  gateFalse: PropTypes.element
};

export default GateFunction;
