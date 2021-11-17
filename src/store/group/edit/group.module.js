import { editGroupMutations } from "./group.mutations";
import { editGroupActions } from "./group.actions";
import { editGroupGetters } from "./group.getters";

const editGroupModule = {
  namespaced: true,
  state: () => ({
    data: null,
    isGroupLoading: false,
    GroupErrorMsg: null
  }),
  mutations: editGroupMutations,
  actions: editGroupActions,
  getters: editGroupGetters
};

export default editGroupModule;
