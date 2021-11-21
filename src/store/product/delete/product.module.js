import { deleteGroupMutations } from "./product.mutations";
import { deleteGroupActions } from "./product.actions";
import { deleteGroupGetters } from "./product.getters";

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
