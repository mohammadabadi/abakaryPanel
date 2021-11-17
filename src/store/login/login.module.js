import { loginMutations } from "./login.mutations";
import { loginActions } from "./login.actions";
import { loginGetters } from "./login.getters";

const productModule = {
  namespaced: true,
  state: () => ({
    data: null,
    isLoginLoading: false,
    loginErrorMsg: null
  }),
  mutations: loginMutations,
  actions: loginActions,
  getters: loginGetters
};

export default productModule;