import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import DashboardView from '../views/DashboardView.vue'
import InventoryView from '../views/InventoryView.vue'
import ReportView from '../views/ReportView.vue'
import UsersView from '../views/UsersView.vue'
import BranchesView from '../views/BranchesView.vue'
import SalesReportView from '../views/reports/SalesReportView.vue'
import ExpensesReportView from '../views/reports/ExpensesReportView.vue'
import SalesView from '../views/SalesView.vue'
import DailyActivityView from '../views/reports/DailyActivityView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/dashboard'
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: DashboardView,
      meta: { requiresAuth: true }
    },
    {
      path: '/sales',
      name: 'sales',
      component: SalesView,
      meta: { requiresAuth: true }
    },
    {
      path: '/inventory',
      name: 'inventory',
      component: InventoryView,
      meta: { requiresAuth: true }
    },
    {
      path: '/inventory/:locationId/:stockId',
      name: 'stock-details',
      component: () => import('@/views/StockDetailsView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/branches',
      name: 'branches',
      component: BranchesView,
      meta: { requiresAuth: true }
    },
    {
      path: '/branches/:locationId/stocks',
      name: 'branchInventory',
      component: InventoryView,
      meta: { requiresAuth: true }
    },
    {
      path: '/reports',
      name: 'reports',
      component: ReportView,
      meta: { requiresAuth: true }
    },
    {
      path: '/reports/daily-activity',
      name: 'daily-activity-report',
      component: DailyActivityView,
      meta: { requiresAuth: true }
    },
    {
      path: '/reports/sales',
      name: 'sales-report',
      component: SalesReportView,
      meta: { requiresAuth: true }
    },
    {
      path: '/reports/expenses',
      name: 'expenses-report',
      component: ExpensesReportView,
      meta: { requiresAuth: true }
    },
    {
      path: '/users',
      name: 'users',
      component: UsersView,
      meta: { requiresAuth: true }
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      meta: { requiresAuth: false }
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView,
      meta: { requiresAuth: false }
    }
  ]
})

// Global auth flag to prevent multiple initializations
let authInitialized = false

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore()
  
  // Skip auth check for login and register
  if (to.meta.requiresAuth === false) {
    // If user is already authenticated and tries to access login/register, redirect to dashboard
    if (authStore.isAuthenticated) {
      next({ name: 'dashboard' })
      return
    }
    next()
    return
  }

  // Initialize auth only once if not already initialized
  if (!authInitialized) {
    try {
      await authStore.initializeAuth()
    } catch (error) {
      console.error('Auth initialization failed:', error)
      // If initialization fails and we're not on a public route, go to login
      if (to.meta.requiresAuth) {
        next({ name: 'login' })
        return
      }
    } finally {
      authInitialized = true
    }
  }

  // After initialization, check auth requirements
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next({ name: 'login' })
    return
  }

  next()
})

export default router 