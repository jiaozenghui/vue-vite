<script lang="ts" setup>
import { GridLayout, GridItem } from "vue3-grid-layout-next";
import {getCurrentInstance, ref, onMounted, toRefs } from 'vue';
import widget from "@/components/widgets/index.vue";



const { proxy: { $nextTick, $forceUpdate }, }: any = getCurrentInstance();
const { proxy }: any = getCurrentInstance();
let props = defineProps({
    id: {type:String} as any,
    'page-type': {type:String} as any,
    layouts: [] as any,
    mode: {
        type: String
    } as any
});
let {layouts} = toRefs(props);
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
            id:'chart1', title: '面积图', chart_type: 'area', type:'chart'
        },
        {
            id:'chart2', title: '线图', chart_type: 'line', type:'chart'
        },
        {
            id:'chart3', title: '柱状图', chart_type: 'interval', type:'chart'
        },
        {
            id:'chart4', title: '表盘', chart_type: 'dashboard', type:'chart'
        }
    ]}, 
    {id:'3', type:'chart', title:'流量报表', wedget: 'flow_report'},
    {id:'4', type:'chart', title:'TopN报表', wedget: 'topn_report'},
    {id:'5', type:'chart', title:'历史告警', wedget: 'alarm_report'},
    {id:'6', type:'chart', title:'外部页面',  wedget: 'out_page'}

]);
//const layout = ref([]) as any;
let draggable= ref(true);
let resizable= ref(true);
const gridlayout = ref();
const content = ref();
let colNum = ref(12);
let index= 0;

let checkConf = ref({}) as any;

let mouseXY = {"x": null, "y": null} as any;
let DragPos = {"x": null, "y": null, "w": 1, "h": 1, "i": null} as any;
const gridItems = ref({}) as any;

const comps= ref({});

function addItem (item:any) {

    // Add a new item. It must have a unique key!
    layouts.value.push({
        x: (layouts.value.length * 4) % (colNum.value || 12),
        y: layouts.value.length + (colNum.value || 12), // puts it at the bottom
        w: 4,
        h: 8,
        i: layouts.value.length.toString(),
        wedget:{
            type: item.type,
            id: item.type+index.toString(),
            comp_name: item.type,
            reqParams: {},
            styles: {
                'background-color': 'transparent'
            }
        }
    });
    // Increment the counter to ensure key is always unique.
    index++;
}
function removeItem (val:any) {
    const index = layouts.value.map((item:any) => item.i).indexOf(val);
    layouts.value.splice(index, 1);
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

function dragend (e:any, item:any) {
    let parentRect = content.value.getBoundingClientRect();
    let mouseInGrid = false;
    if (((mouseXY.x > parentRect.left) && (mouseXY.x < parentRect.right)) && ((mouseXY.y > parentRect.top) && (mouseXY.y < parentRect.bottom))) {
        mouseInGrid = true;
    }
    if (mouseInGrid === true) {
        console.log('in')
        //alert(`Dropped element props:\n${JSON.stringify(DragPos, ['x', 'y', 'w', 'h'], 2)}`);
        //gridlayouts.value.dragEvent('dragend', 'drop', DragPos.x, DragPos.y, 1, 1);
        //layouts.value = layouts.value.filter((obj:any) => obj.i !== 'drop');
        // UNCOMMENT below if you want to add a grid-item

        addItem(item);
        //gridlayouts.value.dragEvent('dragend', DragPos.i, DragPos.x,DragPos.y,200,200);
        try {
            //gridlayouts.value.$children[layouts.value.length].$refs.item.style.display="block";
        } catch {
        }
    }
}
function layClick(e:any, element:any) {
      checkConf.value[element.wedget.id]=ref(!checkConf.value[element.wedget.id]);
      proxy.$ldrawer({confs: {
        element: element.wedget,
        dataChange: function(data:any) {
          comps.value[element.wedget.id].changeData(data);
        }
      }}).show();
      e = e|| window.event;
      e.stopPropagation();
      
    }


</script>



<template>
    <div class="edit-zone">
        <div v-if="mode== 'edit'" class="select-zone">
            <a-collapse v-model:activeKey="activeKey" accordion>
                <a-collapse-panel v-for="wedget in selectWidgets" :key="wedget.id" :header="wedget.title" >
                    <a-collapse-panel  @dragend="dragend($event, item)" class="droppable-element" draggable="true"
                    unselectable="on"  v-for="item in wedget.children" :key="item.id" :header="item.title" >
                        <p>test</p>
                    </a-collapse-panel>
                </a-collapse-panel>
            </a-collapse>
        </div>
        <div ref="content" class="draw-zone">
            <GridLayout
                ref="gridlayout"
                v-model:layout="layouts"
                :col-num="colNum"
                :row-height="30"
                :is-draggable="draggable"
                :is-resizable="resizable"
                :vertical-compact="true"
                :use-css-transforms="true" :responsive="responsive"
            >
            <grid-item  v-for="item in layouts"
                            :ref="item.i"
                            :static="false"
                            :x="item.x"
                            :y="item.y"
                            :w="item.w"
                            :h="item.h"
                            :i="item.i"
                            :class="{actived:checkConf[item.wedget.id]}"
                            @click="layClick($event,item)"
                            style="overflow: auto">
                            <div class="widget-container">
                                <widget  :conf="item.wedget" :ref="(el:any) => {comps[item.wedget.id] = el;}" ></widget>
                            </div>
                                <span class="remove" @click="removeItem(item.i)">x</span>
                    </grid-item>
            </GridLayout>
        
        </div>
        <div id="set-container" class="conf-zone"></div>

    </div>

</template>

<style lang="less" scoped>
.widget-container {
    width: 100%;
    height: 100%;
    padding: 15px;
}

.edit-zone {
    display: flex;
    .select-zone {
        flex: 0 0 100px;
        background: rgb(24, 24, 28);
    }
    .draw-zone {
        flex: 1 1  auto;
        min-height: calc(100vh - 60px);
        border: 2px dashed #5a5555;
    }
    .conf-zone {
        flex: 0 0 auto;
        position: relative;
    }
}

.ant-collapse > .ant-collapse-item > .ant-collapse-header {
    color: rgb(235 229 229 / 85%);
}

.vue-grid-item:not(.vue-grid-placeholder) {
    border: 1px dashed #4c4040;
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
    top: 3px;
    font-size: 16px;
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
:deep(.vue-grid-item>.vue-resizable-handle) {
    border-right: 2px solid #eee;
    border-bottom: 2px solid #eee;
    height: 14px;
    width: 14px;
}

.ant-collapse {
    background: transparent;
    color: #fff;
    border:none;
}
:deep(.ant-collapse > .ant-collapse-item > .ant-collapse-header) {
    color: #fff;
    background-color: #232324;
}
:deep(.ant-collapse-content) {
    background: transparent;
    color: #fff;
    border-top: none;
    
}
:deep(.ant-collapse-header[role="button"]) {
    background: #524444;
    text-align: center;
    margin-top: 5px;
    font-size: 12px;
    padding: 3px;
    cursor: drag;
    &:last-child {
        margin-bottom: 0;
    }
}
:deep(.ant-collapse > .ant-collapse-item) {
    border-bottom: none;
}
</style>
