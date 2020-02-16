import Vue from 'vue'
import VueRouter from 'vue-router'
import Test from '@/components/Test.vue'
import Navbar from '@/components/Navbar.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/navbar',
    name: 'navbar',
    component: Navbar
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/',
    name: 'Test',
    component: Test
  }
]

const router = new VueRouter({
  routes
})

export default router
