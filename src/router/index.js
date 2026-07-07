import { createRouter, createWebHistory } from 'vue-router'

export const routes = [
  {
    path: '/',
    redirect: '/console',
    meta: { hidden: true }
  },
  {
    name: 'console',
    path: '/console',
    meta: { title: 'nav.console', i18n: true },
    component: () => import('../views/Console.vue')
  },
  {
    name: 'devices',
    path: '/devices',
    meta: { title: 'nav.devices', i18n: true },
    children: [
      {
        name: 'deviceList',
        path: 'list',
        meta: { title: 'nav.deviceList', i18n: true },
        component: () => import('../views/DeviceList.vue')
      }
    ]
  },
  {
    name: 'todo',
    path: '/todo',
    meta: { title: 'nav.todo', i18n: true },
    children: [
      {
        name: 'todoToday',
        path: 'today',
        meta: { title: 'nav.todoToday', i18n: true },
        component: () => import('../views/TodayTodo.vue')
      }
    ]
  }
]

const router = createRouter({
  routes,
  history: createWebHistory()
})

export default router
