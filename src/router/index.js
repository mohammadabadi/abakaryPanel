import {createRouter,createWebHistory} from 'vue-router';
import { routesConfig } from "./routesConfig";
//import { CookieUtilsInstance } from "../utils";

const routes = [...routesConfig]
const router = createRouter ({
    history : createWebHistory(),
    routes,
})
// router.beforeEach((to, from, next) => {
//   if (to.matched.some(record => record.meta.requiresAuth)) {
//     if (CookieUtilsInstance.getCookie("jwt_access_token") == null) {
//       next({
//         path: "/login",
//         params: { nextUrl: to.fullPath }
//       });
//     } else {
//       document.body.classList.remove("auth");
//       next();
//     }
//   } else if (to.matched.some(record => record.meta.guest)) {
//     if (CookieUtilsInstance.getCookie("jwt_access_token") == null) {
//       document.body.classList.add("auth");
//       next();
//     } else {
//       next({ name: "Home" });
//     }
//   } else {
//     document.body.classList.remove("auth");
//     next();
//   }
// });
export default router