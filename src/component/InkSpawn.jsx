const React = require("react");
const PropTypes = require("prop-types");
const {useStdout, useStderr} = require("ink");

const inkSpawn = require("../function/ink-spawn");

/// spawn shell command; pipe to ink-safe std streams
const InkSpawn = props => {
  const [done, setDone] = React.useState(false);
  const [error, setError] = React.useState(false);
  const {write: writeErr} = useStderr();
  const {write: writeOut} = useStdout();

  React.useEffect(() => {
    inkSpawn({
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

InkSpawn.propTypes = {
  /// spawn shell command
  command: PropTypes.string.isRequired,
  /// spawn shell arguments
  args: PropTypes.array,
  /// spawn options
  options: PropTypes.object,
  /// completion callback
  onDone: PropTypes.func,
  /// intercept thrown error with callback
  onError: PropTypes.func
};

module.exports = InkSpawn;
