import Vue from 'vue'
import VueRouter from 'vue-router'
import Test from '@/components/Test.vue'
// import Navbar from '@/components/Navbar.vue'
import Table from '@/components/Table.vue'
import Table2 from '@/components/Table2.vue'
import Thin from '@/components/Thin.vue'
import Crud from '@/components/Crud.vue'
import Edit from '@/components/edit.vue'

Vue.use(VueRouter)

const routes = [
  // {
  //   path: '/navbar',
  //   name: 'navbar',
  //   component: Navbar
  // },
  {
    path: '/edit',
    name: 'edit',
    component: Edit
  },
  {
    path: '/thin',
    name: 'thin',
    component: Thin
  },
  {
    path: '/crud',
    name: 'crud',
    component: Crud,
    props: true
  },
  {
    path: '/table2',
    name: 'table2',
    component: Table2
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
  },
  {
    path: '/test',
    name: 'Test',
    component: Test
  }
]

const router = new VueRouter({
  routes
})

export default router
