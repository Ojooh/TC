import { createRouter, createWebHistory } from 'vue-router';
import { useUserStore } from '../stores/user';

import LoginView from '../views/loginView.vue';
import DashboardView from '../views/DashboardView.vue';
import MemberView from '../views/MemberView.vue';


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Index',
      component: LoginView
    },
    {
      path: '/login',
      name: 'Login',
      component: LoginView
    },
    {
      path: '/logout',
      name: 'Logout',
      component: LoginView
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: DashboardView,
    },
    {
      path: '/members',
      name: 'Members',
      component: MemberView,
    },
    {
      path: '/register',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    }
  ]
});

router.beforeEach(async (to) => {
  // redirect to login page if not logged in and trying to access a restricted page
  const publicPages = ['/login'];
  const authRequired = !publicPages.includes(to.path);
  const { isLoggedIn } = useUserStore();

  if (authRequired && !isLoggedIn()) {
      return '/login';
  }
});


export default router
