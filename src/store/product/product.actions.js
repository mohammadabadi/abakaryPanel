import axios from "axios";
import { ProductActionTypes } from "./product.types";

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
      axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
       axios.post(`http://service.abakary.ir/api/Product/GetProducts?ShopId=1`,searchField).then(response => {
        if (response.statusText === "OK") {
          
          context.dispatch(
            ProductActionTypes.FETCH_PRODUCT_SUCCESS,
            response.data.data
          );
          resolve("You fetched product list successfully!");
          onSuccess();
        } else {
          context.dispatch(ProductActionTypes.FETCH_PRODUCT_FAILURE);
          reject(response.data.message);
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
