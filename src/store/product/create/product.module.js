import { createGroupMutations } from "./product.mutations";
import { createGroupActions } from "./product.actions";
import { createGroupGetters } from "./product.getters";

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
