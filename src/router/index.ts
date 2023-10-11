import { createRouter, createWebHistory } from 'vue-router'

import loginView from '../views/loginView.vue';
import dashboardView from '../views/dashboardView.vue';




const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: loginView
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: dashboardView
    }
    
    

    
    
  ]
})
  

export default router
