import { createRouter, createWebHistory } from "vue-router"

import Login from "../views/Login.vue"
import Home from "../views/Home.vue"
import Product from "../views/Product.vue"
import Admin from "../views/Admin.vue"
import Cart from '../views/Cart.vue'
// import { patch } from "../../../backend/routes/user.js"

const routes = [
  { path: "/", redirect: "/login" },
  { path: "/login", component: Login },
  { path: "/home", component: Home },
  { path: "/product", component: Product },
  { path: "/admin", component: Admin },
  { path: "/cart", component: Cart}
]




// export default createRouter({
//   history: createWebHistory(),
//   routes
// })



const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to, from, next) => {
  const isLogin = localStorage.getItem("isLogin")

  if (to.path !== "/login" && !isLogin) {
    next("/login")
  } else {
    next()
  }
})

export default router;