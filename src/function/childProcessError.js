module.exports = function (message, props) {
  const error = new Error(message);
  const defaultProps = {
    errno: 0,
    code: "",
    syscall: "",
    path: "",
    ...props
  };
  for (let key in defaultProps) {
    error[key] = defaultProps[key];
  }
  return error;
};
