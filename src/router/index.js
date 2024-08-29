import { createRouter, createWebHistory } from 'vue-router'
import Swal from 'sweetalert2'
import UserLogin from '@/views/UserLogin.vue'
import UserRegister from '@/views/UserRegister.vue'
import Dashboard from '@/views/UserDashboard.vue'

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'Login',
    component: UserLogin,
    meta: { title: '線上代辦事項服務 | 登入' }
  },
  {
    path: '/register',
    component: UserRegister,
    meta: { title: '線上代辦事項服務 | 註冊' }
  },
  {
    path: '/dashboard',
    component: Dashboard,
    meta: { requiresAuth: true, title: '線上代辦事項服務 | 主頁' }
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/login'
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

router.beforeEach((to, form, next) => {
  const isAuthenticated = sessionStorage.getItem('token');

  if (to.meta.title) {
    document.title = to.meta.title;
  }

  if (to.matched.some(record => record.meta.requiresAuth) && !isAuthenticated) {
    Swal.fire({
      title: '請先登入',
      icon: 'warning',
      confirmButtonText: '確定'
    })
    .then(() => {
      next({ name: 'Login' });
    });
  } else {
    next();
  }
});

export default router