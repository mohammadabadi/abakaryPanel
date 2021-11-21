import axios from "axios";
import { CategoryActionTypes } from "./category.types";
import { CookieUtilsInstance } from "../../utils";
import { base_url } from "../static";

export const categoryActions = {
  [CategoryActionTypes.FETCH_CATEGORY_START]({ commit }) {
    commit(CategoryActionTypes.FETCH_CATEGORY_START);
  },
  [CategoryActionTypes.FETCH_CATEGORY_SUCCESS]({ commit }, payload) {
    commit(CategoryActionTypes.FETCH_CATEGORY_SUCCESS, payload);
  },
  [CategoryActionTypes.FETCH_CATEGORY_FAILURE]({ commit }) {
    commit(CategoryActionTypes.FETCH_CATEGORY_FAILURE);
  },
  [CategoryActionTypes.FETCH_CATEGORY_START_ASYNC](
    context,
    { payload: { onSuccess, onError, searchField } }
  ) {
    context.dispatch(CategoryActionTypes.FETCH_CATEGORY_START);
    return new Promise((resolve, reject) => {
      axios.defaults.headers.common["Authorization"] = `Bearer ${CookieUtilsInstance.getCookieFromBrowser("jwt_access_token")}`;
      axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
      axios.post(`${base_url}/Category/GetCategories?ShopId=${CookieUtilsInstance.getCookieFromBrowser("shopId")}`,searchField).then(response => {
        if (response.statusText === "OK") {
          
          context.dispatch(
            CategoryActionTypes.FETCH_CATEGORY_SUCCESS,
            response.data.data
          );
          resolve("You fetched Category list successfully!");
          onSuccess();
        } else {
          context.dispatch(CategoryActionTypes.FETCH_CATEGORY_FAILURE);
          reject(response.data.message);
          onError();
        }
      });
    });
  }
};

export const fetchCategoryStart = store => {
  return store.dispatch({
    type: `category/${CategoryActionTypes.FETCH_CATEGORY_START}`
  });
};

export const fetchCategorySuccess = (store, payload) => {
  return store.dispatch({
    type: `category/${CategoryActionTypes.FETCH_CATEGORY_SUCCESS}`,
    payload
  });
};

export const fetchCategoryFailure = (store, payload) => {
  return store.dispatch({
    type: `category/${CategoryActionTypes.FETCH_CATEGORY_FAILURE}`,
    payload
  });
};

export const fetchCategoryStartAsync = (store, payload) => {
  return store.dispatch({
    type: `category/${CategoryActionTypes.FETCH_CATEGORY_START_ASYNC}`,
    payload
  });
};
