import React from "react";
import PropTypes from "prop-types";

/// run a function once
const InkFunction = ({func, args = []}) => {
  React.useEffect(() => {
    func(...args);
  }, []);

  return null;
};

InkFunction.propTypes = {
  /// function that returns boolean result
  func: PropTypes.func.isRequired,
  /// args sent to the function
  args: PropTypes.array
};

export default InkFunction;
