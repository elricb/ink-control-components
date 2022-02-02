const childProcessError = function (message, props) {
  const error = new Error(message);
  const defaultProps = {
    errno: 0,
    code: "",
    syscall: "",
    path: "",
    ...props
  };

  for (const [key, value] of Object.entries(defaultProps)) {
    error[key] = value;
  }

  return error;
};

export default childProcessError;
