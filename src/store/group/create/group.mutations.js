import { CreateGroupActionTypes } from "./group.types";

export const createGroupMutations = {
  [CreateGroupActionTypes.FETCH_CREATE_GROUP_START](state) {
    state.isGroupLoading = true;
  },
  [CreateGroupActionTypes.FETCH_CREATE_GROUP_SUCCESS](state, payload) {
    state.isGroupLoading = false;
    state.data = payload;
  },
  [CreateGroupActionTypes.FETCH_CREATE_GROUP_FAILURE](state, payload) {
    state.isGroupLoading = false;
    state.GroupErrorMsg = payload;
  }
};
