import {spawn} from "child_process";
import React from "react";
import PropTypes from "prop-types";
import {useStdout, useStderr} from "ink";

/// spawn shell command; pipe to ink-safe std streams
const GateSpawn = ({
  command,
  args = [],
  options = {},
  children = null,
  gateNull = null,
  gateFalse = null,
  onDone = () => {},
  onError = () => {}
}) => {
  const {write: writeErr} = useStderr();
  const {write: writeOut} = useStdout();
  const [code, setCode] = React.useState(null);

  React.useEffect(() => {
    const cp = spawn(command, args, options);
    cp.stdout.on("data", data => writeOut(data));
    cp.stderr.on("data", data => writeErr(data));
    cp.on("close", raw => {
      const code = Number.parseInt(raw, 10) || 0;
      setCode(code);
      onDone(code);
    });
    cp.on("error", error => onError(error));
  }, []);

  return code === null ? gateNull : code === 0 ? children : gateFalse;
};

GateSpawn.propTypes = {
  /// spawn shell command
  command: PropTypes.string.isRequired,
  /// spawn shell arguments
  args: PropTypes.array,
  /// spawn options
  options: PropTypes.object,
  /// completion callback
  onDone: PropTypes.func,
  /// intercept thrown error with callback
  onError: PropTypes.func,
  /// standard React children element
  children: PropTypes.any,
  /// on failure show React element
  gateFalse: PropTypes.any,
  /// while processing show React element
  gateNull: PropTypes.any
};

export default GateSpawn;
