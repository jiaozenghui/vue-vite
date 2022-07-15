import  { createVNode,render }  from 'vue'

export default function create(Component:any, props:any) {
    const div = document.createElement("div");
    document.body.appendChild(div);

    let comp = createVNode(Component, props);

    render(comp, div);
}