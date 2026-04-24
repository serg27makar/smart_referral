import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import EmptyView from '@/views/EmptyView.vue'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import AuthLayout from '@/layouts/AuthLayout.vue'

const routes = [
  {
    path: '/',
    component: DefaultLayout,
    children: [
      {
        path: '',
        name: 'home',
        component: HomeView
      },
      {
        path: 'not-sure',
        name: 'not-sure',
        component: EmptyView
      },
      {
        path: 'walk-through',
        name: 'walk-through',
        component: EmptyView
      },
      {
        path: 'know-what-i-need',
        name: 'know-what-i-need',
        component: EmptyView
      }
    ]
  },
  {
    path: '/auth',
    component: AuthLayout,
    children: [
      {
        path: 'login',
        name: 'login',
        component: LoginView
      }
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Навигационный гард для имитации авторизации
router.beforeEach((to, from, next) => {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true'
  
  if (to.name !== 'login' && !isLoggedIn) {
    next({ name: 'login' })
  } else if (to.name === 'login' && isLoggedIn) {
    next({ name: 'home' })
  } else {
    next()
  }
})

export default router
