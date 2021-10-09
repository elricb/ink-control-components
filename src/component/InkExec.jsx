const React = require("react");
const PropTypes = require("prop-types");
const {useStdout, useStderr} = require("ink");

const inkExec = require("../function/inkExec");

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
      onError: err => setError(err)
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

module.exports = InkExec;
