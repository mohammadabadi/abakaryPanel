import { ProfileActionTypes } from "./profile.types";

export const PROFILEMutations = {
    [ProfileActionTypes.FETCH_PROFILE_START](state) {
        state.isProfileLoading = true;
    },
    [ProfileActionTypes.FETCH_PROFILE_SUCCESS](state, payload) {
        state.isProfileLoading = false;
        state.data = payload;
    },
    [ProfileActionTypes.FETCH_PROFILE_FAILURE](state, payload) {
        state.isProfileLoading = false;
        state.ProfileErrorMsg = payload;
    }
};