export const Category = {
  path: "/category",
  name: "'دسته بندی ها'",
  component: () => import("./index.vue"),
  meta: {
    requiresAuth: true,
    layout: {
        config: {
            sideBar: true
        }
    }
  }
};
