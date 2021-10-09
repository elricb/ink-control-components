const {exec} = require("child_process");

const childProcessError = require("./childProcessError");

/// exec shell command
module.exports = function ({
  command,
  options = {},
  onDone = () => {},
  onError = () => {},
  writeOut = process.stdout.write,
  writeErr = process.stderr.write
}) {
  let errors = "";
  const cp = exec(command, options);
  cp.stdout.on("data", data => writeOut(data));
  cp.stderr.on("data", data => {
    errors += data + "";
    writeErr(data);
  });
  cp.on("close", code => {
    if (code != "0" && errors !== "") {
      onError(
        childProcessError(errors.trim("\n"), {
          errno: code,
          path: command,
          syscall: `exec ${command}`
        })
      );
    }
    onDone(code);
  });
  cp.on("error", err => onError(err));
};


