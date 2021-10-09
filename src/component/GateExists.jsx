const React = require("react");
const { existsSync } = require("fs");
const PropTypes = require("prop-types");

const GateExists = ({ path, children, gateFalse = null }) => {
  const exists = React.useRef(existsSync(path));
  return exists.current ? children : gateFalse;
};

GateExists.propTypes = {
  path: PropTypes.string.isRequired,
  children: PropTypes.any,
  gateFalse: PropTypes.element,
};

module.exports = GateExists;
