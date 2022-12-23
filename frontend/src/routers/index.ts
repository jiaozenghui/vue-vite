import { createRouter, createWebHistory } from 'vue-router'
import BaseLayout from './../layouts/BaseLayout.vue'
import BaseEditLayout from './../layouts/BaseEditLayout.vue'
import BaseViewLayouts from './../layouts/views/BaseViewLayouts.vue'
import BigView from './../layouts/big/BigView.vue'
import draw from './draws/draws.vue'
import views from './views/views.vue'
import bigViews from './big-views/bigViews.vue'
import page from './pages/page.vue'
import topology from './topology/topology.vue'
import graph from './graph/graph.vue'
import tree from './tree/tree.vue'
import editorview from './editorview/index.vue'

import pageEditor from './page-editor/pageEditor.vue'

import ownDashboard from './dashboards/own-dashboard.vue'
import linkDiagram from './link-diagram/index.vue'



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
      path: '/dashboard-own',
      component: ownDashboard,
    },
    {
      path: '/link-diagram',
      component: linkDiagram,
    },
    {
      path: '/edit',
      // You could also have named views at tho top
      component: BaseEditLayout,
      children: [
        {
          path: 'page',
          component: pageEditor,
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
    },
    {
      path: '/view',
      component: BigView,
      children: [
        {
          path: 'page',
          component: page,
        }
      ],
    },
    {
      path: '/topology',
      component: topology
    },
    {
      path: '/graph',
      component: graph
    },
    {
      path: '/tree',
      component: tree
    },
    {
      path: '/g6-editor',
      component: editorview
    }
  ],
})
