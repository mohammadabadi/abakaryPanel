import { createStore, createLogger } from "vuex";
import rootModule from "./root-module";
import _ from "lodash";

const debug = process.env.NODE_ENV !== "production";

export default createStore({
  state: {},
  mutations: {
    resetState(state) {
      _.forOwn(rootModule, (value, key) => {
        state[key] = _.cloneDeep(value.state);
      });
    }
  },
  actions: {
    resetState: ({ commit }) => {
      commit("resetState");
    }
  },
  modules: _.cloneDeep(rootModule),
  strict: debug,
  plugins: debug ? [createLogger()] : []
});
