import Vue from 'vue'
import Router from 'vue-router'
//页面
import Index from './views/index.vue'
import Register from './views/register.vue'
import Page404 from './views/404.vue'
import Login from './views/login.vue'
//组件
import Home from './components/home.vue'
import InfoShow from './components/infoshow.vue'
import FundList from './components/fundlist.vue'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      redirect: "/index",
    },
    {
      path: "/index",
      component: Index,
      children: [
        { path: "/", redirect: "/home" },
        { path: "/home", name: 'home', component: Home },
        { path: '/infoshow', name: 'infoshow', component: InfoShow },
        { path: '/fundlist', name: 'fundlist', component: FundList }
      ]
    },
    {
      path: "/register",
      name: "register",
      component: Register
    },
    {
      path: "/login",
      name: "login",
      component: Login
    },
    {
      path: "*",
      name: "page404",
      component: Page404
    }
  ]
})
//路由守卫
router.beforeEach((to, from, next) => {
  const isLogin = localStorage.eleToken ? true : false;
  if (to.path == "/login" || to.path == "/register") {
    next();
  } else {
    isLogin ? next() : next("/login")
  }
})

export default router
