import Vue from "vue";
import Vuex from "vuex";
import PromiseWorker from "promise-worker";

Vue.use(Vuex);

import _babelWorker from "worker-loader!../worker.js";

export const babelWorker = new PromiseWorker(_babelWorker());

export default new Vuex.Store({
  strict: true,
  state: {
    current: 0,
    transitions: ["class Foo {}"],
    options: {
      presets: ["es2015"]
    },
    errors: []
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
    clearTransitions(state) {
      state.transitions = [state.transitions[0]];
      state.current = 0;
    },
    receiveResult(state, { transitions, errors }) {
      if (Array.isArray(transitions)) state.transitions.push(...transitions);
      if (Array.isArray(errors)) state.errors.push(...errors);
    }
  },
  actions: {
    updateCurrent({ commit }, current) {
      commit("updateCurrent", current);
    },
    updateSource({ commit }, source) {
      commit("updateSource", source);
    },
    updateOptions({ commit }, options) {
      commit("updateOptions", options);
    },
    transform({ commit, state: { transitions, options } }, presets) {
      const source = transitions[0];
      commit("clearTransitions");
      return babelWorker
        .postMessage({ source, options: { presets } })
        .then(result => {
          commit("receiveResult", result);
          return result;
        });
    }
  }
});
