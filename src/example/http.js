const React = require("react");
const {render, Box, Text, useStdout, useStderr} = require("ink");

const GateHttp = require("../component/GateHttp");

const Example1 = () => {
  const [response, setResponse] = React.useState({});
  const {write: writeErr} = useStderr();
  const {write: writeOut} = useStdout();

  return (
    <Box flexDirection="column" marginTop={1} marginBottom={1}>
      <Box flexDirection="column">
        <Text bold color="green">component GateHttp - truthy</Text>
        <GateHttp
          options={{hostname: "npmjs.com", port: 443, path: "/", method: "GET"}}
          onData={data => writeOut(data)}
          onError={data => writeErr(data)}
          onDone={data => setResponse(data)}
          gateFalse={<Text>False Result</Text>}
        >
          <Text>{JSON.stringify(response)}</Text>
        </GateHttp>
      </Box>
    </Box>
  );
};

render(<Example1 />);
