import axios from "axios";
import { base_url } from "../static";
import { ProfileActionTypes } from "./profile.types";

export const profileActions = {
    [ProfileActionTypes.FETCH_PROFILE_START]({ commit }) {
        commit(ProfileActionTypes.FETCH_PROFILE_START);
    },
    [ProfileActionTypes.FETCH_PROFILE_SUCCESS]({ commit }, payload) {
        commit(ProfileActionTypes.FETCH_PROFILE_SUCCESS, payload);
    },
    [ProfileActionTypes.FETCH_PROFILE_FAILURE]({ commit }) {
        commit(ProfileActionTypes.FETCH_PROFILE_FAILURE);
    },
    [ProfileActionTypes.FETCH_PROFILE_START_ASYNC](
        context, { payload: { onSuccess, onError, searchField } }
    ) {
        context.dispatch(ProfileActionTypes.FETCH_PROFILE_START);
        return new Promise((resolve, reject) => {
            axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
            axios.post(`${base_url}/Account/GetAccounts`, searchField).then(response => {
                if (response.statusText === "OK") {

                    context.dispatch(
                        ProfileActionTypes.FETCH_PROFILE_SUCCESS,
                        response.data.data
                    );
                    resolve("You fetched Account list successfully!");
                    onSuccess();
                } else {
                    context.dispatch(ProfileActionTypes.FETCH_PROFILE_FAILURE);
                    reject(response.data.message);
                    onError();
                }
            });
        });
    }
};

export const fetchProfileStart = store => {
    return store.dispatch({
        type: `profile/${ProfileActionTypes.FETCH_PROFILE_START}`
    });
};

export const fetchProfileSuccess = (store, payload) => {
    return store.dispatch({
        type: `profile/${ProfileActionTypes.FETCH_PROFILE_SUCCESS}`,
        payload
    });
};

export const fetchProfileFailure = (store, payload) => {
    return store.dispatch({
        type: `profile/${ProfileActionTypes.FETCH_PROFILE_FAILURE}`,
        payload
    });
};

export const fetchProfileStartAsync = (store, payload) => {
    return store.dispatch({
        type: `profile/${ProfileActionTypes.FETCH_PROFILE_START_ASYNC}`,
        payload
    });
};