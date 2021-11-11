const React = require("react");
const PropTypes = require("prop-types");

const InputYesNo = require("./InputYesNo");

const GateYesNo = ({text, children, gateFalse = null, callback = () => {}}) => {
  const [answer, setAnswer] = React.useState(null);

  return (
    <React.Fragment>
      <InputYesNo
        text={text}
        callback={b => {
          setAnswer(b);
          callback(b);
        }}
      />
      {answer === null ? null : answer === true ? children : gateFalse}
    </React.Fragment>
  );
};

GateYesNo.propTypes = {
  children: PropTypes.any,
  callback: PropTypes.func,
  gateFalse: PropTypes.element,
  text: PropTypes.string.isRequired
};

module.exports = GateYesNo;
