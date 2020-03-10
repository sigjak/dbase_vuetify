import Vue from 'vue'
import VueRouter from 'vue-router'
import Table from '@/components/Table.vue'

import Thin from '@/components/Thin.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/thin',
    name: 'thin',
    component: Thin
  },

  {
    path: '/table',
    name: 'table',
    component: Table,
    props: true
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
