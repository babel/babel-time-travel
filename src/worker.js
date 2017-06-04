import registerPromiseWorker from "promise-worker/register";
import generate from "babel-generator";
import babelPresetBabili from "babel-preset-babili";

importScripts("//unpkg.com/babel-standalone@6/babel.min.js");

registerPromiseWorker(function babelTransform({ source, options = {} }) {
  let transitions = [];

  if (Array.isArray(options.presets)) {
    for (const [i, preset] of options.presets.entries()) {
      if (preset === "babili") {
        options.presets[i] = babelPresetBabili;
      }
    }
  }

  Object.assign(options, {
    wrapPluginVisitorMethod(pluginAlias, visitorType, callback) {
      return function(...args) {
        const { code } = generate(getProgramParent(args[0]).node);
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
