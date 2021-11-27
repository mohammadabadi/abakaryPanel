import { editProfileMutations } from "./profile.mutations";
import { editProfileActions } from "./profile.actions";
import { editProfileGetters } from "./profile.getters";

const editProfileModule = {
    namespaced: true,
    state: () => ({
        data: null,
        isProfileLoading: false,
        ProfileErrorMsg: null
    }),
    mutations: editProfileMutations,
    actions: editProfileActions,
    getters: editProfileGetters
};

export default editProfileModule;