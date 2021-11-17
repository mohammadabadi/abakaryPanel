import { GroupActionTypes } from "./group.types";

export const groupMutations = {
  [GroupActionTypes.FETCH_GROUP_START](state) {
    state.isGroupLoading = true;
  },
  [GroupActionTypes.FETCH_GROUP_SUCCESS](state, payload) {
    state.isGroupLoading = false;
    state.data = payload;
  },
  [GroupActionTypes.FETCH_GROUP_FAILURE](state, payload) {
    state.isGroupLoading = false;
    state.GroupErrorMsg = payload;
  }
};
