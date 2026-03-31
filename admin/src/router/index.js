import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '../store/user'

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/login/index.vue'),
    meta: { requiresAuth: false }
  },
  {
    path: '/',
    name: 'Layout',
    component: () => import('../views/layout/index.vue'),
    meta: { requiresAuth: true },
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('../views/layout/Dashboard.vue'),
        meta: { title: '首页', icon: 'HomeFilled' }
      },
      {
        path: 'system',
        name: 'System',
        meta: { title: '系统管理', icon: 'Setting' },
        children: [
          {
            path: 'config',
            name: 'SystemConfig',
            component: () => import('../views/system/Config.vue'),
            meta: { title: '系统设置' }
          },
          {
            path: 'users',
            name: 'SystemUsers',
            component: () => import('../views/system/Users.vue'),
            meta: { title: '用户管理' }
          }
        ]
      },
      {
        path: 'page',
        name: 'Page',
        meta: { title: '页面管理', icon: 'Document' },
        children: [
          {
            path: 'banner',
            name: 'PageBanner',
            component: () => import('../views/page/Banner.vue'),
            meta: { title: '轮播管理' }
          },
          {
            path: 'car-service',
            name: 'PageCarService',
            component: () => import('../views/page/CarService.vue'),
            meta: { title: '汽车服务' }
          },
          {
            path: 'professional-service',
            name: 'PageProfessionalService',
            component: () => import('../views/page/ProfessionalService.vue'),
            meta: { title: '专业服务' }
          },
          {
            path: 'professional-accessory',
            name: 'PageProfessionalAccessory',
            component: () => import('../views/page/ProfessionalAccessory.vue'),
            meta: { title: '专业配件' }
          },
          {
            path: 'hot-product',
            name: 'PageHotProduct',
            component: () => import('../views/page/HotProduct.vue'),
            meta: { title: '热门产品' }
          }
        ]
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const userStore = useUserStore()
  if (to.meta.requiresAuth && !userStore.token) {
    next('/login')
  } else if (to.path === '/login' && userStore.token) {
    next('/')
  } else {
    next()
  }
})

export default router
