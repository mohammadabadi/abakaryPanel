import { groupMutations } from "./shop.mutations";
import { shopActions } from "./shop.actions";
import { shopGetters } from "./shop.getters";

const shopModule = {
    namespaced: true,
    state: () => ({
        data: null,
        isshopLoading: false,
        shopErrorMsg: null
    }),
    mutations: groupMutations,
    actions: shopActions,
    getters: shopGetters
};

export default shopModule;