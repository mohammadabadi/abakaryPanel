import axios from "axios";
import { base_url } from "../../static";
import { CreateGroupActionTypes } from "./group.types";
import { CookieUtilsInstance } from "../../../utils";

export const createGroupActions = {
    [CreateGroupActionTypes.FETCH_CREATE_GROUP_START]({ commit }) {
        commit(CreateGroupActionTypes.FETCH_CREATE_GROUP_START);
    },
    [CreateGroupActionTypes.FETCH_CREATE_GROUP_SUCCESS]({ commit }, payload) {
        commit(CreateGroupActionTypes.FETCH_CREATE_GROUP_SUCCESS, payload);
    },
    [CreateGroupActionTypes.FETCH_CREATE_GROUP_FAILURE]({ commit }) {
        commit(CreateGroupActionTypes.FETCH_CREATE_GROUP_FAILURE);
    },
    [CreateGroupActionTypes.FETCH_CREATE_GROUP_START_ASYNC](
        context, { payload: { onSuccess, onError, groupData } }
    ) {
        context.dispatch(CreateGroupActionTypes.FETCH_CREATE_GROUP_START);
        return new Promise((resolve, reject) => {
            axios.defaults.headers.common["Authorization"] = `Bearer ${CookieUtilsInstance.getCookieFromBrowser("jwt_access_token")}`;
            axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
            axios.post(`${base_url}/Group/Add`, groupData).then(response => {
                if (response.data === 0) {
                    resolve("You fetched group list successfully!");
                    onSuccess();
                } else {
                    reject(response.data.message);
                    onError();
                }
            });
        });
    }
};

export const fetchCreateGroupStart = store => {
    return store.dispatch({
        type: `createGroup/${CreateGroupActionTypes.FETCH_CREATE_GROUP_START}`
    });
};

export const fetchCreateGroupSuccess = (store, payload) => {
    return store.dispatch({
        type: `createGroup/${CreateGroupActionTypes.FETCH_CREATE_GROUP_SUCCESS}`,
        payload
    });
};

export const fetchCreateGroupFailure = (store, payload) => {
    return store.dispatch({
        type: `createGroup/${CreateGroupActionTypes.FETCH_CREATE_GROUP_FAILURE}`,
        payload
    });
};

export const fetchCreateGroupStartAsync = (store, payload) => {
    debugger;
    return store.dispatch({
        type: `createGroup/${CreateGroupActionTypes.FETCH_CREATE_GROUP_START_ASYNC}`,
        payload
    });
};