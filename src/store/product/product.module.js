import { groupMutations } from "./product.mutations";
import { productActions } from "./product.actions";
import { productGetters } from "./product.getters";

const productModule = {
  namespaced: true,
  state: () => ({
    data: null,
    isProductLoading: false,
    productErrorMsg: null
  }),
  mutations: groupMutations,
  actions: productActions,
  getters: productGetters
};

export default productModule;