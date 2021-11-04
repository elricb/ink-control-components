import test from "ava";
import {Text} from "ink";
import React from "react";
import PropTypes from "prop-types";
import {render} from "ink-testing-library";

import {
  GateBoolean,
  GateExists,
  GateYesNo,
  InputYesNo,
  GateFunction
} from "../lib";

test("component GateBoolean - truthy", t => {
  const {lastFrame} = render(
    <GateBoolean condition={true}>
      <Text>True Result</Text>
    </GateBoolean>
  );

  t.is(lastFrame(), "True Result");
});

test("component GateBoolean - falsey", t => {
  const {lastFrame} = render(
    <GateBoolean condition={false} gateFalse={<Text>False Result</Text>}>
      <Text>True Result</Text>
    </GateBoolean>
  );

  t.is(lastFrame(), "False Result");
});

test("component GateExists - truthy", t => {
  const {lastFrame} = render(
    <GateExists path={`${__dirname}/testfile.txt`}>
      <Text>True Result</Text>
    </GateExists>
  );

  t.is(lastFrame(), "True Result");
});

test("component GateExists - falsey", t => {
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

test("component GateFunction - truthy", t => {
  const {lastFrame} = render(
    <GateFunction func={() => true}>
      <Text>True Result</Text>
    </GateFunction>
  );

  // ink-testing-library doesn't handle async results
  // t.is(lastFrame(), "True Result");
  t.is(lastFrame(), "");
});

test("component GateFunction - falsey", t => {
  const {lastFrame} = render(
    <GateFunction func={() => false} gateFalse={<Text>False Result</Text>}>
      <Text>True Result</Text>
    </GateFunction>
  );

  t.is(lastFrame(), "False Result");
});

