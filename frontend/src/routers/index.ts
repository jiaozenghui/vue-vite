import { createRouter, createWebHistory } from 'vue-router'
import BaseLayout from './../layouts/BaseLayout.vue'
import draw from './draws/draws.vue'

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      // You could also have named views at tho top
      component: BaseLayout,
      children: [
        {
          path: 'draw',
          component: draw,
        }
      ],
    },
  ],
})
