import { createGroupMutations } from "./group.mutations";
import { createGroupActions } from "./group.actions";
import { createGroupGetters } from "./group.getters";

const createGroupModule = {
  namespaced: true,
  state: () => ({
    data: null,
    isGroupLoading: false,
    GroupErrorMsg: null
  }),
  mutations: createGroupMutations,
  actions: createGroupActions,
  getters: createGroupGetters
};

export default createGroupModule;
