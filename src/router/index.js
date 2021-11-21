import {createRouter,createWebHistory} from 'vue-router';
import { routesConfig } from "./routesConfig";
import { CookieUtilsInstance } from "../utils";

const routes = [...routesConfig]
const router = createRouter ({
    history : createWebHistory(),
    routes,
})
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (CookieUtilsInstance.getCookieFromBrowser("jwt_access_token") == null) {
      next({
        path: "/login",
        params: { nextUrl: to.fullPath }
      });
    } else {
      next();
    }
  } else if (to.matched.some(record => record.meta.guest)) {
    if (CookieUtilsInstance.getCookieFromBrowser("jwt_access_token") == null) {
      next();
    } else {
      next({ name: "Home" });
    }
  } else {
    next();
  }
});
export default router