const React = require("react");
const {render, Box, Text} = require("ink");

const InkExec = require("../component/InkExec");
const InkSpawn = require("../component/InkSpawn");

const Example1 = () => (
  <Box flexDirection="column" marginTop={1}>
    <Box flexDirection="column" marginBottom={1}>
      <Text bold>InkSpawn example 1 - stdout</Text>
      <InkSpawn
        command="echo"
        args={["InkSpawn stdout text"]}
        onDone={code => <Text color="green">{`Done (${code})`}</Text>}
        onError={err => <Text color="red">{`${err} (${JSON.stringify(err)})`}</Text>}
      />
    </Box>
    <Box flexDirection="column" marginBottom={1}>
      <Text bold>InkSpawn example 2 - stderr</Text>
      <InkSpawn
        command="InkSpawn-error"
        onDone={code => <Text color="green">{`Done (${code})`}</Text>}
        onError={err => <Text color="red">{`${err} (${JSON.stringify(err)})`}</Text>}
      />
    </Box>
    <Box flexDirection="column" marginBottom={1}>
      <Text bold>InkExec example 1 - stdout</Text>
      <InkExec
        command="echo 'InkExec stdout text'"
        onDone={code => <Text color="green">{`Done (${code})`}</Text>}
        onError={err => <Text color="red">{`${err} (${JSON.stringify(err)})`}</Text>}
      />
    </Box>
    <Box flexDirection="column" marginBottom={1}>
      <Text bold>InkExec example 2 - stderr</Text>
      <InkExec
        command="InkExec-error"
        onDone={code => <Text color="green">{`Done (${code})`}</Text>}
        onError={err => <Text color="red">{`${err} (${JSON.stringify(err)})`}</Text>}
      />
    </Box>
  </Box>
);

render(<Example1 />);
