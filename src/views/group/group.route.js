export const Groups = {
  path: "/group",
  name: "'گروه ها'",
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
