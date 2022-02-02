import {existsSync} from "fs";
import React from "react";
import PropTypes from "prop-types";

const GateExists = ({path, children, gateFalse = null}) => {
  const [result, setResult] = React.useState();

  React.useEffect(() => {
    if (!path) {
      return;
    }

    const exists = existsSync(path);

    if (exists !== result) {
      setResult(exists);
    }
  }, [path]);

  return result ? children : gateFalse;
};

GateExists.propTypes = {
  path: PropTypes.string.isRequired,
  children: PropTypes.any,
  gateFalse: PropTypes.element
};

export default GateExists;
