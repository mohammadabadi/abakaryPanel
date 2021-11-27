import { CreateProfileActionTypes } from "./profile.types";

export const createProfileMutations = {
    [CreateProfileActionTypes.FETCH_CREATE_PROFILE_START](state) {
        state.isProfileLoading = true;
    },
    [CreateProfileActionTypes.FETCH_CREATE_PROFILE_SUCCESS](state, payload) {
        state.isProfileLoading = false;
        state.data = payload;
    },
    [CreateProfileActionTypes.FETCH_CREATE_PROFILE_FAILURE](state, payload) {
        state.isProfileLoading = false;
        state.ProfileErrorMsg = payload;
    }
};