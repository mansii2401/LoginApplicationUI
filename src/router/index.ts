import { createRouter, createWebHistory } from 'vue-router'

import loginView from '../views/LoginView.vue';
import dashboardView from '../views/DashboardView.vue';
import usersView from '../views/UsersView.vue';
import userDetails from '../views/UserDetails.vue';




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
    },
    {
      path: '/users',
      name: 'users',
      component: usersView
    },
    {
      path: '/userDetails/:id',
      name: 'userDetails',
      component: userDetails
    },  
  ]
})
  

export default router
