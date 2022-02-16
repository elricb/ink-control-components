import PropTypes from "prop-types";

const GateBoolean = ({
  children,
  condition,
  gateNull = null,
  gateFalse = null
}) =>
  condition === null ? gateNull : condition === true ? children : gateFalse;

GateBoolean.propTypes = {
  children: PropTypes.any.isRequired,
  condition: PropTypes.bool,
  // I think these are the valid types: element, array, array of node, node, string
  gateNull: PropTypes.any,
  gateFalse: PropTypes.any
};

export default GateBoolean;
