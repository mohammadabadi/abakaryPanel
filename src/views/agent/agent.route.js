export const Agent = {
  path: "/agent",
  name: "'عوامل'",
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
