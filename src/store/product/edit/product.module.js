import { editGroupMutations } from "./product.mutations";
import { editGroupActions } from "./product.actions";
import { editGroupGetters } from "./product.getters";

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
