import { deleteGroupMutations } from "./group.mutations";
import { deleteGroupActions } from "./group.actions";
import { deleteGroupGetters } from "./group.getters";

const deleteGroupModule = {
  namespaced: true,
  state: () => ({
    data: null,
    isGroupLoading: false,
    GroupErrorMsg: null
  }),
  mutations: deleteGroupMutations,
  actions: deleteGroupActions,
  getters: deleteGroupGetters
};

export default deleteGroupModule;
