import process from "process";
import {exec} from "child_process";
import childProcessError from "./child-process-error.js";

/// Exec shell command
const inkExec = function ({
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
    errors += String(data);
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
  cp.on("error", error => onError(error));
};

export default inkExec;
