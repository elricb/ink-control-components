# ink-control-components

> Control components for [Ink](https://github.com/vadimdemedes/ink).

Common decision operations through JSX for Ink.

## Requirements

* [node](https://nodejs.org/en/download/) - recommended lts version >= 12

## Install

```
$ npm install --save-dev @elricb/ink-control-components
```

## Contents

- [Components](#components)
  - [`<GateBoolean>`](#gateboolean)
  - [`<GateExists>`](#gateexists)
  - [`<GateYesNo>`](#gateyesno)
  - [`<GateFunction>`](#gatefunction)

## Components


### `<GateBoolean>`

Expose or block child component.

```jsx
import {render, Text} from "ink";
import {GateBoolean} from "ink-control-components";

const Example = () => (
  <GateBoolean condition={true} gateFalse={<Text>GateBoolean false</Text>}>
    <Text>GateBoolean true</Text>
  </GateBoolean>
);

render(<Example />);
```

#### gateFalse

Type: `element`

Alternate component to display if condition is false.

#### gateNull

Type: `element`

Alternate component to display if condition is null.

#### condition

Type: `boolean`

Expose children on condition true.


### `<GateExists>`

Expose or block child component if dir/file exists.

```jsx
import {render, Text} from "ink";
import {GateExists} from "ink-control-components";

const Example = () => (
  <GateExists path={`/etc/hosts`} gateFalse={<Text>hosts missing</Text>}>
    <Text>It exists, do something</Text>
  </GateExists>
);

render(<Example />);
```

#### gateFalse

Type: `element`

Alternate component to display if path is false.

#### gateNull

Type: `element`

Alternate component to display if path is null.

#### path 

Type: `string`

Path to test.


### `<GateYesNo>`

Display yes/no input, wait for input, then show/hide child component based on answer.

```jsx
import {render, Text} from "ink";
import {GateYesNo} from "ink-control-components";

const Example = () => (
  <GateYesNo Text={`Choose yes or no`} gateFalse={<Text>No Selected</Text>}>
    <Text>Yes Selected</Text>
  </GateYesNo>
);

render(<Example />);
```

#### gateFalse

Type: `element`

Alternate component to display if path is false.

#### text 

Type: `string`

Yes/No question.


### `<GateFunction>`

Expose or block child component based on function results.

```jsx
import {render, Text} from "ink";
import {GateFunction} from "ink-control-components";

const Example = () => (
  <GateFunction
    func={(a1) => a1 ? true : false}
    args={[true]}
    gateFalse={<Text>GateFunction false</Text>}
  >
    <Text>GateFunction true</Text>
  </GateFunction>
);

render(<Example />);
```

#### gateFalse

Type: `element`

Alternate component to display if condition is false.

#### func

Type: `function`

Function that returns boolean.

#### args

Type: `array`

Args sent to function.

