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
    component: () => import(/* webpackChunkName: "newProject" */ '../views/projectView/ProjectGlance.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
