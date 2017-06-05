import registerPromiseWorker from "promise-worker/register";
import prettier from "prettier";

registerPromiseWorker(function format({ code }) {
  return prettier.format(code);
});
