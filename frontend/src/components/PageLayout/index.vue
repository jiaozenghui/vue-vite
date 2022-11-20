<script lang="ts" setup>
import { GridLayout, GridItem } from "vue3-grid-layout-next";
import {getCurrentInstance, ref, onMounted } from 'vue';
const { proxy: { $nextTick, $forceUpdate }, }: any = getCurrentInstance();
const { proxy }: any = getCurrentInstance();
defineProps({
    id: {type:String},
    'page-type': {type:String}
})
const responsive = ref(true);
const activeKey = ref([]);
const selectWidgets = ref([
    {id:'1', type:'view', title:'视图', children:[
        {
            id:'view1', title: '状态统计', type: 'stastic_type', children:[
            {id: 'view1_1', title: '默认界面1', wedget: 'test'},
            {id: 'view1_2', title: '默认界面2', wedget: 'test1'}
            ]
        },
        {
            id:'view2', title: '苹果树', type: 'apple_tree', children:[
            {id: 'view2_1', title: '默认界面1', wedget: 'test'}
            ]
        },
        {
            id:'view3', title: '设备视图', type: 'device_view', children:[
            {id: 'view3_1', title: '默认界面1', wedget: 'test'}
            ]
        },
        {
            id:'view4', title: '监测点视图', type: 'detect_view', children:[
            {id: 'view4_1', title: '默认界面1', wedget: 'test'}
            ]
        },
        {
            id:'view5', title: '告警视图', type: 'detect_view', children:[
                {id: 'view5_1', title: '默认界面1', wedget: 'test'}
            ]
        },
        {
            id:'view6', title: '拓扑视图', type: 'topology_view', children:[
                {id: 'view6_1', title: '默认界面1', wedget: 'test'}
            ]
        },
        {
            id:'view7', title: '链路图', type: 'topology_view', children:[
                {id: 'view7_1', title: '北京', wedget: 'test'}
            ]
        },
    ]},

    {id:'2', type:'chart', title:'图表', children:[
        {
            id:'chart1', title: '面积图', type: 'area'
        },
        {
            id:'chart2', title: '线图', type: 'line'
        },
        {
            id:'chart3', title: '柱状图', type: 'interval'
        },
        {
            id:'chart4', title: '表盘', type: 'dashboard'
        }
    ]}, 
    {id:'2', type:'chart', title:'流量报表', wedget: 'flow_report'},
    {id:'2', type:'chart', title:'TopN报表', wedget: 'topn_report'},
    {id:'2', type:'chart', title:'历史告警', wedget: 'alarm_report'},
    {id:'2', type:'chart', title:'外部页面',  wedget: 'out_page'}

]);
const layout = ref([
    { x: 0, y: 0, w: 2, h: 2, i: "0" },
    { x: 2, y: 0, w: 2, h: 2, i: "1" },
    { x: 4, y: 0, w: 2, h: 2, i: "2" },
    { x: 6, y: 0, w: 2, h: 2, i: "3" },
    { x: 8, y: 0, w: 2, h: 2, i: "4" },
]) as any;
let draggable= ref(true);
let resizable= ref(true);
const gridlayout = ref();
const content = ref();
let colNum = ref(12);
let index= 0;

let mouseXY = {"x": null, "y": null} as any;
let DragPos = {"x": null, "y": null, "w": 1, "h": 1, "i": null} as any;
const gridItems = ref({}) as any;


function addItem () {
    // Add a new item. It must have a unique key!
    layout.value.push({
        x: (layout.value.length * 2) % (colNum.value || 12),
        y: layout.value.length + (colNum.value || 12), // puts it at the bottom
        w: 2,
        h: 2,
        i: index.toString(),
    });
    // Increment the counter to ensure key is always unique.
    index++;
}
function removeItem (val:any) {
    const index = layout.value.map((item:any) => item.i).indexOf(val);
    layout.value.splice(index, 1);
}

onMounted(()=>{       
    $nextTick(()=>{
        document.addEventListener("dragover", function (e) {
            mouseXY.x = e.clientX;
            mouseXY.y = e.clientY;
        }, false);
    })
    $forceUpdate();
})


function drag (e:any) {
    let parentRect = content.value.getBoundingClientRect();
    let mouseInGrid = false;
    if (((mouseXY.x > parentRect.left) && (mouseXY.x < parentRect.right)) && ((mouseXY.y > parentRect.top) && (mouseXY.y < parentRect.bottom))) {
        mouseInGrid = true;
    }
    if (mouseInGrid === true && (layout.value.findIndex((item:any) => item.i === 'drop')) === -1) {
        layout.value.push({
            x: (layout.value.length * 2) % (colNum.value || 12),
            y: layout.value.length + (colNum.value || 12), // puts it at the bottom
            w: 1,
            h: 1,
            i: 'drop',
        });
    }
    let index = layout.value.findIndex((item:any) => item.i === 'drop');
    if (index !== -1) {
        try {
            gridItems.value[layout.value.length].value.style.display = "none";
        } catch {
        }
        //let el = proxy.$refs[index];
        //el.dragging = {"top": mouseXY.y - parentRect.top, "left": mouseXY.x - parentRect.left};
        //let new_pos = el.calcXY(mouseXY.y - parentRect.top, mouseXY.x - parentRect.left);
        let new_pos = {x:0, y:0};
        if (mouseInGrid === true) {
            gridlayout.value.dragEvent('dragstart', 'drop', new_pos.x, new_pos.y, 1, 1);
            DragPos.i = String(index);
            DragPos.x = layout.value[index].x;
            DragPos.y = layout.value[index].y;
        }
        if (mouseInGrid === false) {
            gridlayout.value.dragEvent('dragend', 'drop', new_pos.x, new_pos.y, 1, 1);
            layout.value = layout.value.filter((obj:any) => obj.i !== 'drop');
        }
    }
}
function dragend (e:any) {
    let parentRect = content.value.getBoundingClientRect();
    let mouseInGrid = false;
    if (((mouseXY.x > parentRect.left) && (mouseXY.x < parentRect.right)) && ((mouseXY.y > parentRect.top) && (mouseXY.y < parentRect.bottom))) {
        mouseInGrid = true;
    }
    if (mouseInGrid === true) {
        //alert(`Dropped element props:\n${JSON.stringify(DragPos, ['x', 'y', 'w', 'h'], 2)}`);
        gridlayout.value.dragEvent('dragend', 'drop', DragPos.x, DragPos.y, 1, 1);
        layout.value = layout.value.filter((obj:any) => obj.i !== 'drop');
        // UNCOMMENT below if you want to add a grid-item

        layout.value.push({
            x: DragPos.x,
            y: DragPos.y,
            w: 200,
            h: 200,
            i: DragPos.i,
        });
        gridlayout.value.dragEvent('dragend', DragPos.i, DragPos.x,DragPos.y,200,200);
        try {
            gridlayout.value.$children[layout.value.length].$refs.item.style.display="block";
        } catch {
        }

    }
}
</script>



<template>
    <div class="edit-zone">
        <div class="select-zone">
            <a-collapse v-model:activeKey="activeKey" accordion>
                <a-collapse-panel v-for="wedget in selectWidgets" key="wedget.id" :header="wedget.title" >
                    <a-collapse-panel @drag="drag" @dragend="dragend" class="droppable-element" draggable="true"
                    unselectable="on"  v-for="item in wedget.children" :key="item.id" :header="item.title" >
                        <p>test</p>
                    </a-collapse-panel>
                </a-collapse-panel>
            </a-collapse>
        </div>
        <div ref="content" class="draw-zone">
            <GridLayout
                ref="gridlayout"
                v-model:layout="layout"
                :col-num="colNum"
                :row-height="30"
                :is-draggable="draggable"
                :is-resizable="resizable"
                :vertical-compact="true"
                :use-css-transforms="true" :responsive="responsive"
            >
            <grid-item  v-for="item in layout"
                            :ref="item.i"
                            :static="false"
                            :x="item.x"
                            :y="item.y"
                            :w="item.w"
                            :h="item.h"
                            :i="item.i"
                            style="overflow: auto">
                            <span class="text">{{item.i}}</span>
                                <span class="remove" @click="removeItem(item.i)">x</span>
                    </grid-item>
            </GridLayout>
        
        </div>
        <div id="set-container" class="conf-zone"></div>

    </div>

</template>

<style lang="less" scoped>

.right-side {
    flex: 0 0 auto;
    position: relative;
}
.edit-zone {
    display: flex;
    .select-zone {
        flex: 0 0 200px;
    }
    .draw-zone {
        flex: 1 1  auto;
        min-height: calc(100vh - 60px);
        border: 2px dashed;
    }
    .conf-zone {
        flex: 0 0 auto;
    }
}

.vue-grid-item:not(.vue-grid-placeholder) {
    background: #ccc;
    border: 1px solid black;
}
.vue-grid-item .resizing {
    opacity: 0.9;
}
.vue-grid-item .static {
    background: #cce;
}
.vue-grid-item .text {
    font-size: 24px;
    text-align: center;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    height: 100%;
    width: 100%;
}
.vue-grid-item .no-drag {
    height: 100%;
    width: 100%;
}
.vue-grid-item .minMax {
    font-size: 12px;
}
.vue-grid-item .add {
    cursor: pointer;
}
:deep(.vue-grid-item .remove) {
    position: absolute;
    right: 5px;
    cursor: pointer;
}
.vue-draggable-handle {
    position: absolute;
    width: 20px;
    height: 20px;
    top: 0;
    left: 0;
    background: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='10' height='10'><circle cx='5' cy='5' r='5' fill='#999999'/></svg>") no-repeat;
    background-position: bottom right;
    padding: 0 8px 8px 0;
    background-repeat: no-repeat;
    background-origin: content-box;
    box-sizing: border-box;
    cursor: pointer;
}
.layoutJSON {
    background: #ddd;
    border: 1px solid black;
    margin-top: 10px;
    padding: 10px;
}
.columns {
    -moz-columns: 120px;
    -webkit-columns: 120px;
    columns: 120px;
}


</style>
