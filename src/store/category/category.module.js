import { categoryMutations } from "./category.mutations";
import { categoryActions } from "./category.actions";
import { categoryGetters } from "./category.getters";

const categoryModule = {
  namespaced: true,
  state: () => ({
    data: null,
    isCategoryLoading: false,
    categoryErrorMsg: null
  }),
  mutations: categoryMutations,
  actions: categoryActions,
  getters: categoryGetters
};

export default categoryModule;
