export const Login = {
  path: "/login",
  name: "'ورود'",
  component: () => import("./index.vue"),
  meta: {
    requiresAuth: false,
    layout: {
        config: {
            sideBar: false
        }
    }
  }
};
