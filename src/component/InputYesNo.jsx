const React = require("react");
const {Text, Box} = require("ink");
const PropTypes = require("prop-types");
const TextInput = require("ink-text-input").default || require("ink-text-input");

const getIsYN = input => {
  if (typeof input === "string") {
    if (input.toLowerCase() == "y") {
      return true;
    }
    if (input.toLowerCase() == "n") {
      return false;
    }
  }
  return null;
};

/// input and callback
const InputYesNo = ({text, callback}) => {
  const [input, setInput] = React.useState("");
  const isYN = getIsYN(input);

  React.useEffect(() => {
    if (isYN !== null) {
      callback(isYN);
    }
  }, [input]);

  return (
    <Box>
      <Box marginRight={1}>
        <Text>{`${text} (y/n)?`}</Text>
      </Box>
      {isYN === null ? (
        <TextInput value={input} onChange={setInput} />
      ) : isYN === true ? (
        <Text>{`Yes`}</Text>
      ) : (
        <Text>{`No`}</Text>
      )}
    </Box>
  );
};

InputYesNo.propTypes = {
  callback: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired
};

module.exports = InputYesNo;
