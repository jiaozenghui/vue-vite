import { createVNode, render,createApp} from 'vue';
import LDrawer from './LDrawer.vue'

let createNode = (options:any) => {
    const vm = createVNode(
        LDrawer,
        options,
    )
    render(vm, document.getElementById('set-container')as any)
    return vm;
    //document.body.appendChild(container);
}

const LDrawers: any= function(options:any){
    options.id = options.id || 'l-drawers' + 1;
    let $inst = createNode(options) as any;
    $inst['show']= $inst.component.exposed.show;
    $inst['hide']= $inst.component.exposed.hide;
    return $inst
}
LDrawers.install = (app:any)=>{
    app.component('l-drawers', LDrawers);
    app.config.globalProperties.$ldrawer = LDrawers;
    
}
export default LDrawers