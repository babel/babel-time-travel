import registerPromiseWorker from "promise-worker-transferable/register";
import babelPresetMinify from "babel-preset-minify";
import generate from "babel-generator";
import { str2ab, ab2str } from "./buffer-utils";
importScripts("//unpkg.com/babel-standalone@6.24.2/babel.min.js");

registerPromiseWorker(function babelTransform(
  { source, options = {} },
  withTransferList
) {
  if (Array.isArray(options.presets)) {
    for (const [i, preset] of options.presets.entries()) {
      if (preset === "minify") {
        options.presets[i] = babelPresetMinify;
      }
    }
  }

  options.ast = false;
  options.code = true;

  const transitions = [];

  Object.assign(options, {
    wrapPluginVisitorMethod(pluginAlias, visitorType, callback) {
      return function(...args) {
        const { code } = generate(getProgramParent(args[0]).node);
        if (
          transitions.length === 0 ||
          transitions[transitions.length - 1].code !== code
        ) {
          transitions.push({
            code,
            pluginAlias,
            visitorType,
            currentNode: args[0].node.type,
          });
        }
        callback.call(this, ...args);
      };
    }
  });

  const output = Babel.transform(ab2str(source), options).code;

  transitions.push({
    code: output,
    pluginAlias: "output",
    visitorType: "exit"
  });

  // convert to array buffers and extract buffers
  const buffers = [];
  for (const transition of transitions) {
    Object.assign(transition, {
      code: str2ab(transition.code)
    });
    buffers.push(transition.code);
  }

  return withTransferList({ transitions }, buffers);
});

function getProgramParent(path) {
  let parent = path;
  do {
    if (parent.isProgram()) return parent;
  } while ((parent = parent.parentPath));
}
