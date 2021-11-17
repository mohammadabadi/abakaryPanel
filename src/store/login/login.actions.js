import axios from "axios";
import { LoginActionTypes } from "./login.types";
import { CookieUtils } from "../../utils";

export const loginActions = {
  [LoginActionTypes.FETCH_LOGIN_START]({ commit }) {
    commit(LoginActionTypes.FETCH_LOGIN_START);
  },
  [LoginActionTypes.FETCH_LOGIN_SUCCESS]({ commit }, payload) {
    commit(LoginActionTypes.FETCH_LOGIN_SUCCESS, payload);
  },
  [LoginActionTypes.FETCH_LOGIN_FAILURE]({ commit }) {
    commit(LoginActionTypes.FETCH_LOGIN_FAILURE);
  },
  [LoginActionTypes.FETCH_LOGIN_START_ASYNC](
    context,
    { payload: { onSuccess, onError ,loginData } }
  ) {
    context.dispatch(LoginActionTypes.FETCH_LOGIN_START);
    return new Promise((resolve, reject) => {
      axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
       axios.post(`http://service.abakary.ir/api/Account/SignIn`,loginData).then(response => {
        if (response.data.signIn.succeeded === true) {
          if (response.data.token) {
            CookieUtils.setCookie(
                "jwt_access_token",
                response.data.token
            );
            axios.defaults.headers.common[
                "Authorization"
            ] = `Bearer ${response.data.token}`;
        } else {
            CookieUtils.removeCookie("jwt_access_token");
            delete axios.defaults.headers.common["Authorization"];
        }
          context.dispatch(
            LoginActionTypes.FETCH_LOGIN_SUCCESS,
            response.data
          );
          resolve("SignIn is successfully!");
          onSuccess();
        } else {
          context.dispatch(LoginActionTypes.FETCH_LOGIN_FAILURE);
          onError();
        }
      });
    });
  }
};

export const fetchLoginStart = store => {
  return store.dispatch({
    type: `login/${LoginActionTypes.FETCH_LOGIN_START}`
  });
};

export const fetchLoginSuccess = (store, payload) => {
  return store.dispatch({
    type: `login/${LoginActionTypes.FETCH_LOGIN_SUCCESS}`,
    payload
  });
};

export const fetchLoginFailure = (store, payload) => {
  return store.dispatch({
    type: `login/${LoginActionTypes.FETCH_LOGIN_FAILURE}`,
    payload
  });
};

export const fetchLoginStartAsync = (store, payload) => {
  return store.dispatch({
    type: `login/${LoginActionTypes.FETCH_LOGIN_START_ASYNC}`,
    payload
  });
};
