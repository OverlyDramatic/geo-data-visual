import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import(/* webpackChunkName: "home" */ '../views/home/Home.vue')
  },
  {
    path: '/newProject',
    name: 'newProject',
    component: () => import(/* webpackChunkName: "newProject" */ '../views/newProject/NewProject.vue')
  },
  {
    path: '/projectGlance',
    name: 'projectGlance',
    component: () => import(/* webpackChunkName: "projectGlance" */ '../views/projectView/ProjectGlance.vue')
  },
  {
    path: '/projectMenu',
    name: 'projectMenu',
    component: () => import(/* webpackChunkName: "projectMenu" */ '../views/projectMenu/ProjectMenu.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
