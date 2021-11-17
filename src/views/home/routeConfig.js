export const Home = {
  path: "/",
  name: "Home",
  component: () => import("./index.vue"),
  meta: {
    requiresAuth: false,
    layout: {
        config: {
            sideBar: true
        }
    }
  }
};
