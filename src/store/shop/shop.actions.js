import axios from "axios";
import { base_url } from "../static";
import { ShopActionTypes } from "./shop.types";
import { CookieUtilsInstance } from "../../utils";

export const shopActions = {
    [ShopActionTypes.FETCH_SHOP_START]({ commit }) {
        commit(ShopActionTypes.FETCH_SHOP_START);
    },
    [ShopActionTypes.FETCH_SHOP_SUCCESS]({ commit }, payload) {
        commit(ShopActionTypes.FETCH_SHOP_SUCCESS, payload);
    },
    [ShopActionTypes.FETCH_SHOP_FAILURE]({ commit }) {
        commit(ShopActionTypes.FETCH_SHOP_FAILURE);
    },
    [ShopActionTypes.FETCH_SHOP_START_ASYNC](
        context, { payload: { onSuccess, onError, userId } }
    ) {
        context.dispatch(ShopActionTypes.FETCH_SHOP_START);
        return new Promise((resolve, reject) => {
            axios.defaults.headers.common["Authorization"] = `Bearer ${CookieUtilsInstance.getCookieFromBrowser("jwt_access_token")}`;
            axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
            axios.get(`${base_url}/Shop/GetShopWithUserId?UserId=${userId}`).then(response => {
                if (response.statusText === "OK") {

                    context.dispatch(
                        ShopActionTypes.FETCH_SHOP_SUCCESS,
                        response.data.data
                    );
                    resolve("You fetched shop list successfully!");
                    onSuccess(response.data.data);
                } else {
                    context.dispatch(ShopActionTypes.FETCH_SHOP_FAILURE);
                    reject(response.data.message);
                    onError();
                }
            });
        });
    }
};

export const fetchShopStart = store => {
    return store.dispatch({
        type: `shop/${ShopActionTypes.FETCH_SHOP_START}`
    });
};

export const fetchShopSuccess = (store, payload) => {
    return store.dispatch({
        type: `shop/${ShopActionTypes.FETCH_SHOP_SUCCESS}`,
        payload
    });
};

export const fetchShopFailure = (store, payload) => {
    return store.dispatch({
        type: `shop/${ShopActionTypes.FETCH_SHOP_FAILURE}`,
        payload
    });
};

export const fetchShopStartAsync = (store, payload) => {
    return store.dispatch({
        type: `shop/${ShopActionTypes.FETCH_SHOP_START_ASYNC}`,
        payload
    });
};