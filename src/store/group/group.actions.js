import axios from "axios";
import { base_url } from "../static";
import { GroupActionTypes } from "./group.types";

export const groupActions = {
  [GroupActionTypes.FETCH_GROUP_START]({ commit }) {
    commit(GroupActionTypes.FETCH_GROUP_START);
  },
  [GroupActionTypes.FETCH_GROUP_SUCCESS]({ commit }, payload) {
    commit(GroupActionTypes.FETCH_GROUP_SUCCESS, payload);
  },
  [GroupActionTypes.FETCH_GROUP_FAILURE]({ commit }) {
    commit(GroupActionTypes.FETCH_GROUP_FAILURE);
  },
  [GroupActionTypes.FETCH_GROUP_START_ASYNC](
    context,
    { payload: { onSuccess, onError, searchField } }
  ) {
    context.dispatch(GroupActionTypes.FETCH_GROUP_START);
    return new Promise((resolve, reject) => {
      axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
       axios.post(`${base_url}/Group/GetGroups`,searchField).then(response => {
        if (response.statusText === "OK") {
          
          context.dispatch(
            GroupActionTypes.FETCH_GROUP_SUCCESS,
            response.data.data
          );
          resolve("You fetched group list successfully!");
          onSuccess();
        } else {
          context.dispatch(GroupActionTypes.FETCH_GROUP_FAILURE);
          reject(response.data.message);
          onError();
        }
      });
    });
  }
};

export const fetchGroupStart = store => {
  return store.dispatch({
    type: `group/${GroupActionTypes.FETCH_GROUP_START}`
  });
};

export const fetchGroupSuccess = (store, payload) => {
  return store.dispatch({
    type: `group/${GroupActionTypes.FETCH_GROUP_SUCCESS}`,
    payload
  });
};

export const fetchGroupFailure = (store, payload) => {
  return store.dispatch({
    type: `group/${GroupActionTypes.FETCH_GROUP_FAILURE}`,
    payload
  });
};

export const fetchGroupStartAsync = (store, payload) => {
  return store.dispatch({
    type: `group/${GroupActionTypes.FETCH_GROUP_START_ASYNC}`,
    payload
  });
};
