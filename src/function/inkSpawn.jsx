const {spawn} = require("child_process");

/// spawn shell command
module.exports = function ({
  command,
  args = [],
  options = {},
  onDone = () => {},
  onError = () => {},
  writeOut = process.stdout.write,
  writeErr = process.stderr.write
}) {
  const cp = spawn(command, args, options);
  cp.stdout.on("data", data => writeOut(data));
  cp.stderr.on("data", data => writeErr(data));
  cp.on("close", code => onDone(code));
  cp.on("error", err => onError(err));
};


