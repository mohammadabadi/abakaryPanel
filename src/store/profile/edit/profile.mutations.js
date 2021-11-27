import { EditProfileActionTypes } from "./profile.types";

export const editProfileMutations = {
    [EditProfileActionTypes.FETCH_EDIT_PROFILE_START](state) {
        state.isProfileLoading = true;
    },
    [EditProfileActionTypes.FETCH_EDIT_PROFILE_SUCCESS](state, payload) {
        state.isProfileLoading = false;
        state.data = payload;
    },
    [EditProfileActionTypes.FETCH_EDIT_PROFILE_FAILURE](state, payload) {
        state.isProfileLoading = false;
        state.ProfileErrorMsg = payload;
    }
};