import process from "process";
import {spawn} from "child_process";

/// spawn shell command
const inkSpawn = function ({
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
  cp.on("error", error => onError(error));
};

export default inkSpawn;
