import React from "react";
import PropTypes from "prop-types";
import InputYesNo from "./input-yes-no.jsx";

const GateYesNo = ({text, children, gateFalse = null, callback = () => {}}) => {
  const [answer, setAnswer] = React.useState(null);

  return (
    <>
      <InputYesNo
        text={text}
        callback={b => {
          if (b !== answer) {
            setAnswer(b);
            callback(b);
          }
        }}
      />
      {answer === null ? null : answer === true ? children : gateFalse}
    </>
  );
};

GateYesNo.propTypes = {
  children: PropTypes.any,
  callback: PropTypes.func,
  gateFalse: PropTypes.element,
  text: PropTypes.string.isRequired
};

export default GateYesNo;
