import test from "ava";
import {Text} from "ink";
import React from "react";
import PropTypes from "prop-types";
import {render} from "ink-testing-library";

import {GateBoolean, GateExists, GateYesNo, InputYesNo} from "../lib";

test("component GateBoolean - test 1 - truthy", t => {
  const {lastFrame} = render(
    <GateBoolean condition={true}>
      <Text>True Result</Text>
    </GateBoolean>
  );

  t.is(lastFrame(), "True Result");
});

test("component GateBoolean - test 2 - falsey", t => {
  const {lastFrame} = render(
    <GateBoolean condition={false} gateFalse={<Text>False Result</Text>}>
      <Text>True Result</Text>
    </GateBoolean>
  );

  t.is(lastFrame(), "False Result");
});

test("component GateExists - test 1 - truthy", t => {
  const {lastFrame} = render(
    <GateExists path={`${__dirname}/testfile.txt`}>
      <Text>True Result</Text>
    </GateExists>
  );

  t.is(lastFrame(), "True Result");
});

test("component GateExists - test 2 - falsey", t => {
  const {lastFrame} = render(
    <GateExists
      path={`${__dirname}/testfile-false.txt`}
      gateFalse={<Text>False Result</Text>}
    >
      <Text>True Result</Text>
    </GateExists>
  );

  t.is(lastFrame(), "False Result");
});
