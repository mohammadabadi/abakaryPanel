import { profileMutations } from "./profile.mutations";
import { profileActions } from "./profile.actions";
import { profileGetters } from "./profile.getters";

const profileModule = {
    namespaced: true,
    state: () => ({
        data: null,
        isProfileLoading: false,
        ProfileErrorMsg: null
    }),
    mutations: profileMutations,
    actions: profileActions,
    getters: profileGetters
};

export default profileModule;