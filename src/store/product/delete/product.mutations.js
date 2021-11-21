import { DeleteGroupActionTypes } from "./product.types";

export const deleteGroupMutations = {
  [DeleteGroupActionTypes.FETCH_DELETE_GROUP_START](state) {
    state.isGroupLoading = true;
  },
  [DeleteGroupActionTypes.FETCH_DELETE_GROUP_SUCCESS](state, payload) {
    state.isGroupLoading = false;
    state.data = payload;
  },
  [DeleteGroupActionTypes.FETCH_DELETE_GROUP_FAILURE](state, payload) {
    state.isGroupLoading = false;
    state.GroupErrorMsg = payload;
  }
};
