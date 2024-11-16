import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

const routes = [
  {
    path: '/poverty',
    name: 'poverty',
    component:  () => import('../views/elements/PovertyView.vue')  //对应的vue组件
  },
  {
    path: '/volunteer',
    name: 'volunteer',
    component:  () => import('../views/elements/VolunteerView.vue')  //对应的vue组件
  },
  {
    path: '/help_to_need',
    name: 'help_to_need',
    component:  () => import('../views/elements/HelpToNeedView.vue')  
  },
  {
    path: '/',
    redirect: '/poverty'
  },
]

const router = new VueRouter({
  routes
})

export default router
