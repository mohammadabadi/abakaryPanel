import axios from "axios";
import { EditGroupActionTypes } from "./product.types";
import { CookieUtilsInstance } from "../../../utils";

export const editGroupActions = {
  [EditGroupActionTypes.FETCH_EDIT_GROUP_START]({ commit }) {
    commit(EditGroupActionTypes.FETCH_EDIT_GROUP_START);
  },
  [EditGroupActionTypes.FETCH_EDIT_GROUP_SUCCESS]({ commit }, payload) {
    commit(EditGroupActionTypes.FETCH_EDIT_GROUP_SUCCESS, payload);
  },
  [EditGroupActionTypes.FETCH_EDIT_GROUP_FAILURE]({ commit }) {
    commit(EditGroupActionTypes.FETCH_EDIT_GROUP_FAILURE);
  },
  [EditGroupActionTypes.FETCH_EDIT_GROUP_START_ASYNC](
    context,
    { payload: { onSuccess, onError, EditGroup } }
  ) {
    context.dispatch(EditGroupActionTypes.FETCH_EDIT_GROUP_START);
    return new Promise((resolve, reject) => {
      axios.defaults.headers.common["Authorization"] = `Bearer ${CookieUtilsInstance.getCookieFromBrowser("jwt_access_token")}`;
      axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
       axios.post(`http://service.abakary.ir/api/Group/Edit`,EditGroup).then(response => {
         debugger;
        if (response.data === EditGroup.id) {
          resolve("edit group successfully!");
          onSuccess();
        } else {
          reject(response.data.message);
          onError();
        }
      });
    });
  }
};

export const fetchEditGroupStart = store => {
  return store.dispatch({
    type: `editGroup/${EditGroupActionTypes.FETCH_EDIT_GROUP_START}`
  });
};

export const fetchEditGroupSuccess = (store, payload) => {
  return store.dispatch({
    type: `editGroup/${EditGroupActionTypes.FETCH_EDIT_GROUP_SUCCESS}`,
    payload
  });
};

export const fetchEditGroupFailure = (store, payload) => {
  return store.dispatch({
    type: `editGroup/${EditGroupActionTypes.FETCH_EDIT_GROUP_FAILURE}`,
    payload
  });
};

export const fetchEditGroupStartAsync = (store, payload) => {
  return store.dispatch({
    type: `editGroup/${EditGroupActionTypes.FETCH_EDIT_GROUP_START_ASYNC}`,
    payload
  });
};
