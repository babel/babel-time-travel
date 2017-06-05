import registerPromiseWorker from "promise-worker/register";
import babelPresetBabili from "babel-preset-babili";
import PromiseWorker from "promise-worker";
import generate from "babel-generator";

importScripts("//unpkg.com/babel-standalone@6.24.2/babel.min.js");

registerPromiseWorker(function babelTransform({ source, options = {} }) {
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

  const output = Babel.transform(source, options).code;

  transitions.push(output);

  return { transitions };
});

function getProgramParent(path) {
  let parent = path;
  do {
    if (parent.isProgram()) return parent;
  } while ((parent = parent.parentPath));
}
