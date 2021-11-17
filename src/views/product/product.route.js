export const Product = {
  path: "/product",
  name: "'محصولات'",
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
