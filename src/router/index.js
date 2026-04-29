import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import AuthLayout from '@/layouts/AuthLayout.vue'
import NotSure from "@/views/NotSure.vue";
import WalkThrough from "@/views/WalkThrough.vue";
import KnowWhatNeed from "@/views/KnowWhatNeed.vue";
import ProfileView from '@/views/ProfileView.vue'
import SmartHubView from '@/views/SmartHubView.vue'
import SmartReferralView from '@/views/SmartReferralView.vue'
import DashboardView from '@/views/DashboardView.vue'
import LogicDataView from '@/views/LogicDataView.vue'

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
        path: 'profile',
        name: 'profile',
        component: ProfileView
      },
      {
        path: 'smart-hub',
        name: 'smart-hub',
        component: SmartHubView
      },
      {
        path: 'smart-referral-page',
        name: 'smart-referral-page',
        component: SmartReferralView
      },
      {
        path: 'dashboard',
        name: 'dashboard',
        component: DashboardView
      },
      {
        path: 'logic-data',
        name: 'logic-data',
        component: LogicDataView
      },
      {
        path: 'not-sure',
        name: 'not-sure',
        component: NotSure
      },
      {
        path: 'walk-through',
        name: 'walk-through',
        component: WalkThrough
      },
      {
        path: 'know-what-i-need',
        name: 'know-what-i-need',
        component: KnowWhatNeed
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
  history: createWebHashHistory(),
  routes
})

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
