import PropTypes from "prop-types";

const GateBoolean = ({
  children,
  condition,
  gateNull = null,
  gateFalse = null
}) =>
  condition === null ? gateNull : condition === true ? children : gateFalse;

GateBoolean.propTypes = {
  // React child element: array, array of node, node, string
  children: PropTypes.any.isRequired,
  /// need to set as isRequired when PropTypes support null
  condition: PropTypes.bool,
  /// React child element
  gateNull: PropTypes.any,
  /// React child element
  gateFalse: PropTypes.any
};

export default GateBoolean;
