import Vue from "vue";
import Vuex from "vuex";
import PromiseWorker from "promise-worker";

Vue.use(Vuex);

import _babelWorker from "worker-loader!./babel-worker.js";
import _printerWorker from "worker-loader!./printer-worker.js";

export const babelWorker = new PromiseWorker(_babelWorker());
export const printerWorker = new PromiseWorker(_printerWorker());

export default new Vuex.Store({
  strict: true,
  state: {
    current: 0,
    transitions: ["class Foo {}"],
    options: {
      presets: ["es2015", "babili"]
    },
    isEditing: true
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
      state.transitions[0] = source;
    },
    updateOptions(state, options) {
      Object.assign(state.options, options);
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
    makeReadOnly(state) {
      state.isEditing = false;
    }
  },
  actions: {
    compile({ commit, getters, state }) {
      commit("clearTransitions");
      return babelWorker
        .postMessage({
          source: state.transitions[0],
          options: state.options
        })
        .then(result =>
          Promise.all(
            result.transitions.map(code => printerWorker.postMessage({ code }))
          )
        )
        .then(transitions => {
          commit("receiveResult", transitions);
          return transitions;
        });
    }
  }
});
