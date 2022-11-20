import { createApp } from 'vue'
import App from './App.vue'
import { setupAntd } from './shared/shared-and'
import { router } from './routers'
import  store from './store'
import VueGridLayout from 'vue3-grid-layout-next'

const app = createApp(App)
setupAntd(app)
app.use(VueGridLayout)
app.use(router).use(store).mount('#app')
