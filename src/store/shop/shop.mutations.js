import { ShopActionTypes } from "./shop.types";

export const groupMutations = {
    [ShopActionTypes.FETCH_SHOP_START](state) {
        state.isShopLoading = true;
    },
    [ShopActionTypes.FETCH_SHOP_SUCCESS](state, payload) {
        state.isShopLoading = false;
        state.data = payload;
    },
    [ShopActionTypes.FETCH_SHOP_FAILURE](state, payload) {
        state.isShopLoading = false;
        state.ShopErrorMsg = payload;
    }
};