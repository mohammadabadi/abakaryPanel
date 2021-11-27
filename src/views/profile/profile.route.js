export const Profile = {
    path: "/profile",
    name: "'پروفایل'",
    component: () =>
        import ("./index.vue"),
    meta: {
        requiresAuth: true,
        layout: {
            config: {
                sideBar: true
            }
        }
    }
};