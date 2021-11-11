import test from "ava";
import {Text} from "ink";
import React from "react";
import {render} from "ink-testing-library";

import {InkSpawn, InkExec} from "../lib";

/*
 * Component ink-testing-library doesn't see async responses
 * See example for more accurate display results
 */

test("component InkSpawn - test 1 echo", t => {
  const results = render(
    <InkSpawn
      command="echo"
      args={["Test"]}
      onDone={() => <Text>Done</Text>}
      onError={error => <Text>{`${error}`}</Text>}
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
