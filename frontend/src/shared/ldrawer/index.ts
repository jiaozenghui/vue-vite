import { createVNode, render } from 'vue';
import type {App} from "vue";
import LDrawer from './LDrawer.vue'
const LDrawers: any= function(options:any){
    const container = document.createElement('div');
    container.setAttribute('class', 'drawer-container')
    const vm = createVNode(
        LDrawer,
        options,
    )
    render(vm, container)
    document.body.appendChild(container);
}  
LDrawers.install = (app:any)=>{
    app.component('l-drawers', LDrawers)
    app.config.globalProperties.$ldrawer = LDrawers
}
export default LDrawers