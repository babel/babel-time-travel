import registerPromiseWorker from "promise-worker-transferable/register";
import babelPresetBabili from "babel-preset-babili";
import generate from "babel-generator";
import { str2ab, ab2str } from "./buffer-utils";

importScripts("//unpkg.com/babel-standalone@6.24.2/babel.min.js");

registerPromiseWorker(function babelTransform(
  { source, options = {} },
  withTransferList
) {
  if (Array.isArray(options.presets)) {
    for (const [i, preset] of options.presets.entries()) {
      if (preset === "babili") {
        options.presets[i] = babelPresetBabili;
      }
    }
  }

  options.ast = false;
  options.code = true;

  const transitions = [];

  Object.assign(options, {
    wrapPluginVisitorMethod(pluginAlias, visitorType, callback) {
      return function(...args) {
        const code = generate(getProgramParent(args[0]).node).code;
        if (transitions[transitions.length - 1] !== code) {
          transitions.push(code);
        }
        callback.call(this, ...args);
      };
    }
  });

  const output = Babel.transform(ab2str(source), options).code;

  transitions.push(output);

  const buffers = transitions.map(code => str2ab(code));

  return withTransferList({ transitions: buffers }, [...buffers]);
});

function getProgramParent(path) {
  let parent = path;
  do {
    if (parent.isProgram()) return parent;
  } while ((parent = parent.parentPath));
}
