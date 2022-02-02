import React from "react";
import PropTypes from "prop-types";
import {useStdout, useStderr} from "ink";
import inkExec from "../function/ink-exec.js";

/// exec shell command; pipe to ink-safe std streams
const InkExec = props => {
  const [done, setDone] = React.useState(false);
  const [error, setError] = React.useState(false);
  const {write: writeErr} = useStderr();
  const {write: writeOut} = useStdout();

  React.useEffect(() => {
    inkExec({
      writeErr,
      writeOut,
      ...props,
      onDone: code => setDone(code),
      onError: error => setError(error)
    });
  }, []);

  return done === 0
    ? props.onDone(done) || null
    : error !== false
    ? props.onError(error) || null
    : null;
};

InkExec.propTypes = {
  /// spawn shell command
  command: PropTypes.string.isRequired,
  /// spawn options
  options: PropTypes.object,
  /// completion callback
  onDone: PropTypes.func,
  /// intercept thrown error with callback
  onError: PropTypes.func
};

export default InkExec;
