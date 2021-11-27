import axios from "axios";
import { base_url } from "../../static";
import { EditProfileActionTypes } from "./profile.types";
import { CookieUtilsInstance } from "../../../utils";

export const editProfileActions = {
    [EditProfileActionTypes.FETCH_EDIT_PROFILE_START]({ commit }) {
        commit(EditProfileActionTypes.FETCH_EDIT_PROFILE_START);
    },
    [EditProfileActionTypes.FETCH_EDIT_PROFILE_SUCCESS]({ commit }, payload) {
        commit(EditProfileActionTypes.FETCH_EDIT_PROFILE_SUCCESS, payload);
    },
    [EditProfileActionTypes.FETCH_EDIT_PROFILE_FAILURE]({ commit }) {
        commit(EditProfileActionTypes.FETCH_EDIT_PROFILE_FAILURE);
    },
    [EditProfileActionTypes.FETCH_EDIT_PROFILE_START_ASYNC](
        context, { payload: { onSuccess, onError, EditProfile } }
    ) {
        context.dispatch(EditProfileActionTypes.FETCH_EDIT_PROFILE_START);
        return new Promise((resolve, reject) => {
            axios.defaults.headers.common["Authorization"] = `Bearer ${CookieUtilsInstance.getCookieFromBrowser("jwt_access_token")}`;
            axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
            axios.post(`${base_url}/Account/Edit`, EditProfile).then(response => {
                debugger;
                if (response.data === EditProfile.id) {
                    resolve("edit profile successfully!");
                    onSuccess();
                } else {
                    debugger;
                    reject(response.data.Description);
                    onError();
                }
            });
        });
    }
};

export const fetchEditProfileStart = store => {
    return store.dispatch({
        type: `editProfile/${EditProfileActionTypes.FETCH_EDIT_PROFILE_START}`
    });
};

export const fetchEditProfileSuccess = (store, payload) => {
    return store.dispatch({
        type: `editProfile/${EditProfileActionTypes.FETCH_EDIT_PROFILE_SUCCESS}`,
        payload
    });
};

export const fetchEditProfileFailure = (store, payload) => {
    return store.dispatch({
        type: `editProfile/${EditProfileActionTypes.FETCH_EDIT_PROFILE_FAILURE}`,
        payload
    });
};

export const fetchEditProfileStartAsync = (store, payload) => {
    return store.dispatch({
        type: `editProfile/${EditProfileActionTypes.FETCH_EDIT_PROFILE_START_ASYNC}`,
        payload
    });
};