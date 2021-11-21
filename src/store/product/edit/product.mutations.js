import { EditGroupActionTypes } from "./product.types";

export const editGroupMutations = {
  [EditGroupActionTypes.FETCH_EDIT_GROUP_START](state) {
    state.isGroupLoading = true;
  },
  [EditGroupActionTypes.FETCH_EDIT_GROUP_SUCCESS](state, payload) {
    state.isGroupLoading = false;
    state.data = payload;
  },
  [EditGroupActionTypes.FETCH_EDIT_GROUP_FAILURE](state, payload) {
    state.isGroupLoading = false;
    state.GroupErrorMsg = payload;
  }
};
