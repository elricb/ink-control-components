const React = require("react");
const PropTypes = require("prop-types");

const GateFunction = ({func, children, args = [], gateFalse = null}) => {
  const [result, setResult] = React.useState(null);

  React.useEffect(() => {
    setResult(func.apply(null, args));
  }, [func, args]);

  if (result === null) {
    return null;
  }

  return result ? children : gateFalse;
};

GateFunction.propTypes = {
  /// function that returns boolean result
  func: PropTypes.func.isRequired,
  /// args sent to the function
  args: PropTypes.array,
  children: PropTypes.any,
  gateFalse: PropTypes.element
};

module.exports = GateFunction;
