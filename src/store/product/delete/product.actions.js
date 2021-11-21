import axios from "axios";
import { DeleteGroupActionTypes } from "./product.types";
import { CookieUtilsInstance } from "../../../utils";

export const deleteGroupActions = {
  [DeleteGroupActionTypes.FETCH_DELETE_GROUP_START]({ commit }) {
    commit(DeleteGroupActionTypes.FETCH_DELETE_GROUP_START);
  },
  [DeleteGroupActionTypes.FETCH_DELETE_GROUP_SUCCESS]({ commit }, payload) {
    commit(DeleteGroupActionTypes.FETCH_DELETE_GROUP_SUCCESS, payload);
  },
  [DeleteGroupActionTypes.FETCH_DELETE_GROUP_FAILURE]({ commit }) {
    commit(DeleteGroupActionTypes.FETCH_GROUP_FAILURE);
  },
  [DeleteGroupActionTypes.FETCH_DELETE_GROUP_START_ASYNC](
    context,
    { payload: { onSuccess, onError, GroupId } }
  ) {
    context.dispatch(DeleteGroupActionTypes.FETCH_DELETE_GROUP_START);
    return new Promise((resolve, reject) => {
      axios.defaults.headers.common["Authorization"] = `Bearer ${CookieUtilsInstance.getCookieFromBrowser("jwt_access_token")}`;
      axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
       axios.post(`http://service.abakary.ir/api/Group/Delete?id=${GroupId}`).then(response => {
        if (response.data === GroupId) {
          resolve("delete group item successfully!");
          onSuccess();
        } else { 
          reject(response.data.message);
          onError();
        }
      });
    });
  }
};

export const fetchDeleteGroupStart = store => {
  return store.dispatch({
    type: `deleteGroup/${DeleteGroupActionTypes.FETCH_DELETE_GROUP_START}`
  });
};

export const fetchDeleteGroupSuccess = (store, payload) => {
  return store.dispatch({
    type: `deleteGroup/${DeleteGroupActionTypes.FETCH_DELETE_GROUP_SUCCESS}`,
    payload
  });
};

export const fetchDeleteGroupFailure = (store, payload) => {
  return store.dispatch({
    type: `deleteGroup/${DeleteGroupActionTypes.FETCH_DELETE_GROUP_FAILURE}`,
    payload
  });
};

export const fetchDeleteGroupStartAsync = (store, payload) => {
  return store.dispatch({
    type: `deleteGroup/${DeleteGroupActionTypes.FETCH_DELETE_GROUP_START_ASYNC}`,
    payload
  });
};
