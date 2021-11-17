import { ProductActionTypes } from "./product.types";

export const groupMutations = {
  [ProductActionTypes.FETCH_PRODUCT_START](state) {
    state.isProductLoading = true;
  },
  [ProductActionTypes.FETCH_PRODUCT_SUCCESS](state, payload) {
    state.isProductLoading = false;
    state.data = payload;
  },
  [ProductActionTypes.FETCH_PRODUCT_FAILURE](state, payload) {
    state.isProductLoading = false;
    state.productErrorMsg = payload;
  }
};
