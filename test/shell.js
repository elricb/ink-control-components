import test from "ava";
import {Text} from "ink";
import React from "react";
import PropTypes from "prop-types";
import {render} from "ink-testing-library";

import {InkSpawn, InkExec} from "../lib";

/*
 * ink-testing-library doesn't see async responses
 * see example for more accurate display results
 */

test("component InkSpawn - test 1 echo", t => {
  const results = render(
    <InkSpawn
      command="echo"
      args={["Test"]}
      onDone={code => <Text>{`Done`}</Text>}
      onError={err => <Text>{`${err}`}</Text>}
    />
  );
  t.is(results.lastFrame(), "");
});

test("component InkExec - test 1 echo", t => {
  const results = render(
    <InkExec
      command="echo 'Test'"
      onDone={() => <Text>Done</Text>}
      onError={() => <Text>Error</Text>}
    />
  );
  t.is(results.lastFrame(), "");
});
