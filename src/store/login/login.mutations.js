import { LoginActionTypes } from "./login.types";

export const loginMutations = {
  [LoginActionTypes.FETCH_LOGIN_START](state) {
    state.isLoginLoading = true;
  },
  [LoginActionTypes.FETCH_LOGIN_SUCCESS](state, payload) {
    state.isLoginLoading = false;
    state.data = payload;
  },
  [LoginActionTypes.FETCH_LOGIN_FAILURE](state, payload) {
    state.isLoginLoading = false;
    state.loginErrorMsg = payload;
  }
};
