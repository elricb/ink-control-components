import fs from "fs";
import fsPromise from "fs/promises";
import React from "react";

import nodeFsConfigSync from "../config/node-fs-config-sync.json";
import nodeFsConfigPromise from "../config/node-fs-config-promise.json";
import InkPromiseFunction from "./ink-promise-function.js";

const NodeFs = ({name, ...props}) =>
  React.createElement(InkPromiseFunction, {
    ...props,
    func: nodeFsConfigPromise[name]
      ? fsPromise[name]
      : nodeFsConfigSync[name]
      ? args => Promise.resolve(fs[name](...args))
      : Promise.resolve
  });

// # import PropTypes from "prop-types";
// # NodeFs.propTypes = {
// #   /// node function name
// #   name: PropTypes.oneOf([
// #     ...Object.keys(nodeFsConfigPromise),
// #     ...Object.keys(nodeFsConfigSync)
// #   ]).isRequired,
// #   /// arguments sent to function
// #   args: PropTypes.array
// #   /// children passed along
// #   children: PropTypes.any
// # };

export default NodeFs;
