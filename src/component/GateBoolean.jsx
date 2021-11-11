const React = require("react");
const PropTypes = require("prop-types");

const GateBoolean = ({
  children,
  condition,
  gateNull = null,
  gateFalse = null
}) =>
  condition === null ? gateNull : condition === true ? children : gateFalse;

GateBoolean.propTypes = {
  children: PropTypes.any.isRequired,
  condition: PropTypes.bool.isRequired,
  gateNull: PropTypes.any, // I think these are the valid types: element, array, array of node, node, string
  gateFalse: PropTypes.any
};

module.exports = GateBoolean;
