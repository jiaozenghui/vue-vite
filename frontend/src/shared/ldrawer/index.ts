import { createVNode, render,createApp} from 'vue';
import LDrawer from './LDrawer.vue'

let container:any;
let createNode = (options:any) => {
	if(container){
		document.body.removeChild(container)
    	container = null
	}
    container = document.createElement('div');
    container.setAttribute('class', 'drawer-container');
    const vm = createVNode(
        LDrawer,
        options,
    )
    render(vm, container)
    document.body.appendChild(container);
}

const LDrawers: any= function(options:any){
    options.id = options.id || 'l-drawers' + 1;
    let $inst = createNode(options)
    return $inst
}  
LDrawers.install = (app:any)=>{
    app.component('l-drawers', LDrawers)
    app.config.globalProperties.$ldrawer = LDrawers
}
export default LDrawers