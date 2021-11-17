import { groupMutations } from "./group.mutations";
import { groupActions } from "./group.actions";
import { groupGetters } from "./group.getters";

const groupModule = {
  namespaced: true,
  state: () => ({
    data: null,
    isGroupLoading: false,
    GroupErrorMsg: null
  }),
  mutations: groupMutations,
  actions: groupActions,
  getters: groupGetters
};

export default groupModule;
