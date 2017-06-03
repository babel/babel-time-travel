import registerPromiseWorker from "promise-worker/register";

importScripts("//unpkg.com/babel-standalone@6/babel.min.js");

registerPromiseWorker(function babelTransform({ source, options = {} }) {
  console.log(source, options);
  return Babel.transform(source, options).code;
});
