const React = require("react");
const {render, Box, Text} = require("ink");

const GateFunction = require("../component/GateFunction");

const Example1 = () => (
  <Box flexDirection="column" marginTop={1}>
    <Box flexDirection="column" marginBottom={1}>
      <Text bold color="green">component GateFunction - truthy</Text>
      <GateFunction func={() => true} gateFalse={<Text>False Result</Text>}>
        <Text>True Result</Text>
      </GateFunction>
    </Box>
    <Box flexDirection="column" marginBottom={1}>
      <Text bold color="green">component GateFunction - falsey</Text>
      <GateFunction func={() => false} gateFalse={<Text>False Result</Text>}>
        <Text>True Result</Text>
      </GateFunction>
    </Box>
    <Box flexDirection="column" marginBottom={1}>
      <Text bold color="green">component GateFunction - args truthy</Text>
      <GateFunction
        func={bool => {
          return bool ? true : false;
        }}
        args={[true]}
        gateFalse={<Text>False Result</Text>}
      >
        <Text>True Result</Text>
      </GateFunction>
    </Box>
  </Box>
);

render(<Example1 />);
