import { createRouter, createWebHistory } from 'vue-router'
import BaseLayout from './../layouts/BaseLayout.vue'
import BaseViewLayouts from './../layouts/views/BaseViewLayouts.vue'
import BigView from './../layouts/big/BigView.vue'
import draw from './draws/draws.vue'
import views from './views/views.vue'
import bigViews from './big-views/bigViews.vue'

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
    {
      path: '/view',
      component: BaseViewLayouts,
      children: [
        {
          path: 'views',
          component: views,
        }
      ],
    },
    {
      path: '/view/big',
      component: BigView,
      children: [
        {
          path: 'views',
          component: bigViews,
        }
      ],
    }
  ],
})
