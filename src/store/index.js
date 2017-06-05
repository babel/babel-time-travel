import Vue from "vue";
import Vuex from "vuex";
import PromiseWorker from "promise-worker-transferable";
import { str2ab, ab2str } from "./buffer-utils";

Vue.use(Vuex);

import _babelWorker from "worker-loader!./babel-worker.js";

export const babelWorker = new PromiseWorker(_babelWorker());

export default new Vuex.Store({
  strict: true,
  state: {
    current: 0,
    transitions: ["class Foo {}"],
    options: {
      presets: ["es2015", "babili"]
    },
    error: void 0
  },
  getters: {
    availablePresets() {
      return ["es2015", "stage-0", "stage-1", "stage-2", "stage-3", "babili"];
    }
  },
  mutations: {
    updateCurrent(state, current) {
      if (state.transitions.length >= current) {
        state.current = current;
      }
    },
    updateSource(state, source) {
      // remove the error;
      if (state.error) {
        state.error = void 0;
      }
      state.transitions[0] = source;
    },
    updatePresets(state, presets) {
      state.options.presets = [...presets];
    },
    clearTransitions(state) {
      state.transitions = [state.transitions[0]];
      state.current = 0;
    },
    receiveResult(state, transitions) {
      state.transitions.push(...transitions);
    },
    addError(state, error) {
      state.error = error;
    },
    removeError(state) {
      state.error = void 0;
    }
  },
  actions: {
    error({ commit }, error) {
      commit("addError", error);
      setTimeout(() => {
        commit("removeError");
      }, 5000);
    },
    compile({ commit, state, dispatch }) {
      commit("clearTransitions");
      const message = {
        source: str2ab(state.transitions[0]),
        options: state.options
      };
      return babelWorker
        .postMessage(message, [message.source])
        .then(result => {
          const transitions = result.transitions.map(buf => ab2str(buf));
          commit("receiveResult", transitions);
          return transitions;
        })
        .catch(err => {
          dispatch("error", err.message);
        });
    }
  }
});
