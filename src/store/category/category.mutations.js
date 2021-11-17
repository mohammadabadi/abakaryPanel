import { CategoryActionTypes } from "./category.types";

export const categoryMutations = {
  [CategoryActionTypes.FETCH_CATEGORY_START](state) {
    state.isCategoryLoading = true;
  },
  [CategoryActionTypes.FETCH_CATEGORY_SUCCESS](state, payload) {
    state.isCategoryLoading = false;
    state.data = payload;
  },
  [CategoryActionTypes.FETCH_CATEGORY_FAILURE](state, payload) {
    state.isCategoryLoading = false;
    state.categoryErrorMsg = payload;
  }
};
