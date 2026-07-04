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
    meta: { title: '控制台' },
    component: () => import('../views/Console.vue')
  },
  {
    name: 'devices',
    path: '/devices',
    meta: { title: '我的设备' },
    children: [
      {
        name: 'deviceList',
        path: 'list',
        meta: { title: '设备列表' },
        component: () => import('../views/DeviceList.vue')
      }
    ]
  },
  {
    name: 'todo',
    path: '/todo',
    meta: { title: '待办事项' },
    children: [
      {
        name: 'todoToday',
        path: 'today',
        meta: { title: '今日待办' },
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
