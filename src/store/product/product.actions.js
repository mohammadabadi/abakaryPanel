import axios from "axios";
import { base_url } from "../static";
import { ProductActionTypes } from "./product.types";
import { CookieUtilsInstance } from "../../utils";

export const productActions = {
  [ProductActionTypes.FETCH_PRODUCT_START]({ commit }) {
    commit(ProductActionTypes.FETCH_PRODUCT_START);
  },
  [ProductActionTypes.FETCH_PRODUCT_SUCCESS]({ commit }, payload) {
    commit(ProductActionTypes.FETCH_PRODUCT_SUCCESS, payload);
  },
  [ProductActionTypes.FETCH_PRODUCT_FAILURE]({ commit }) {
    commit(ProductActionTypes.FETCH_PRODUCT_FAILURE);
  },
  [ProductActionTypes.FETCH_PRODUCT_START_ASYNC](
    context,
    { payload: { onSuccess, onError, searchField } }
  ) {
    context.dispatch(ProductActionTypes.FETCH_PRODUCT_START);
    return new Promise((resolve, reject) => {
      axios.defaults.headers.common["Authorization"] = `Bearer ${CookieUtilsInstance.getCookieFromBrowser("jwt_access_token")}`;
      axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
       axios.post(`${base_url}/Product/GetProducts?ShopId=${CookieUtilsInstance.getCookieFromBrowser("shopId")}`,searchField).then(response => {
        if (response.statusText === "OK") {
          
          context.dispatch(
            ProductActionTypes.FETCH_PRODUCT_SUCCESS,
            response.data.data
          );
          resolve("You fetched product list successfully!");
          onSuccess();
        } else {
          context.dispatch(ProductActionTypes.FETCH_PRODUCT_FAILURE);
          reject(response.data.Description);
          onError();
        }
      });
    });
  }
};

export const fetchProductStart = store => {
  return store.dispatch({
    type: `product/${ProductActionTypes.FETCH_PRODUCT_START}`
  });
};

export const fetchProductSuccess = (store, payload) => {
  return store.dispatch({
    type: `product/${ProductActionTypes.FETCH_PRODUCT_SUCCESS}`,
    payload
  });
};

export const fetchProductFailure = (store, payload) => {
  return store.dispatch({
    type: `product/${ProductActionTypes.FETCH_PRODUCT_FAILURE}`,
    payload
  });
};

export const fetchProductStartAsync = (store, payload) => {
  return store.dispatch({
    type: `product/${ProductActionTypes.FETCH_PRODUCT_START_ASYNC}`,
    payload
  });
};
