import React from "react";
import PropTypes from "prop-types";
import {useStdout, useStderr} from "ink";
import inkExec from "../function/ink-exec";

/// exec shell command; pipe to ink-safe std streams
const GateExec = ({
  onDone = () => {},
  onError = () => {},
  writeErr,
  writeOut,
  gateNull = null,
  gateFalse = null,
  command,
  children,
  options = {}
}) => {
  const [result, setResult] = React.useState(null);
  const {write: writeStdErr} = useStderr();
  const {write: writeStdOut} = useStdout();

  React.useEffect(() => {
    // Run once regardless of changed props
    if (result !== null) {
      return;
    }

    inkExec({
      writeErr: writeErr || writeStdErr,
      writeOut: writeOut || writeStdOut,
      command,
      options,
      onDone: code => {
        onDone(code);
        setResult(true);
      },
      onError: error => {
        onError(error);
        setResult(false);
      }
    });
  }, []);

  return result === null
    ? gateNull
    : result === true
    ? children
    : result === false
    ? gateFalse
    : null;
};

GateExec.propTypes = {
  /// success components to display
  children: PropTypes.any.isRequired,
  /// child_process exec shell command
  command: PropTypes.string.isRequired,
  /// child_process exec options
  options: PropTypes.object,
  /// write stdout function: (String) => {}
  writeOut: PropTypes.func,
  /// write stderr function: (String) => {}
  writeErr: PropTypes.func,
  /// completion callback: (String) => {}
  onDone: PropTypes.func,
  /// error callback: (Error) => {}
  onError: PropTypes.func,
  /// show element/array/node while processing
  gateNull: PropTypes.any,
  /// show element/array/node on failure
  gateFalse: PropTypes.any
};

export default GateExec;
