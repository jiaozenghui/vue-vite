<script setup lang="ts">
import { ref } from 'vue';
import draggable from "vuedraggable";
defineProps({
    title: {
        default: ''
    }
})
const activeKey = ref(['layout']);
const comps = ref([
    {
        idd: 'layout', title: 'Layouts', type:'layout', children: [
            {idd: '1_col',title: '1 Cols', type:'layout',comp_name: 'Layouts',
                confs: {gutterKey: 0, vgutterKey:0, colCountKey:1},
                cols:[
                    {idd: '1_col_1',title: '2 Cols', type:'col', span: 24, comps:[]}
                ]
            },
            {idd: '2_col',title: '2 Cols', type:'layout',comp_name: 'Layouts',
                cols:[
                    {idd: '2_col_1',title: '2 Cols', type:'col', span: 12, comps:[]},
                    {idd: '2_col_2',title: '2 Cols', type:'col', span: 12, comps:[]}
                ]
            },
            {idd: '3_col',title: '3 Cols', type:'layout',comp_name: 'Layouts',
                cols:[
                    {idd: '3_col_1',title: '2 Cols', type:'col', span: 8, comps:[]},
                    {idd: '3_col_2',title: '2 Cols', type:'col', span: 8, comps:[]},
                    {idd: '3_col_3',title: '2 Cols', type:'col', span: 8, comps:[]}
                ]
            },
            {idd: '4_col',title: '4 Cols', type:'layout',comp_name: 'Layouts',
                cols:[
                    {idd: '4_col_1',title: '2 Cols', type:'col', span: 6, comps:[]},
                    {idd: '4_col_2',title: '2 Cols', type:'col', span: 6, comps:[]},
                    {idd: '4_col_3',title: '2 Cols', type:'col', span: 6, comps:[]},
                    {idd: '4_col_4',title: '2 Cols', type:'col', span: 6, comps:[]}
                ]
            }
        ]
    },
    {
        idd: 'basic', title: 'Basic Components', type:'basic', children: [
            {idd: 'basic_1',title: 'Button', type:'button', comp_name: 'LenovoButton', comp_confs:{title: 'test'}},
            {idd: 'basic_2',title: 'Select', type:'select', comp_name: 'Select'}
        ]
    }
]);
let i =0;
function cloneCompoents (cloneObj) {
    let newObj = JSON.parse(JSON.stringify(cloneObj));
    newObj.idd = 'test' + i++;
    return newObj;
}
</script>

<template>
  <a-collapse v-model:activeKey="activeKey" accordion>
    <a-collapse-panel :key="comp.idd" v-for="comp of comps" :header="comp.title">
        <draggable
            class="comps"
            :list="comp.children"
            item-key="idd"
            :options="{sort: false}"
            :clone="cloneCompoents"
            :group="{ name: 'comp', pull: 'clone',  put: false}"
        >
            <template #item="{element}">
                <p class="c_item" >
                    {{ element.title }}
                </p>
            </template>
        </draggable>
    </a-collapse-panel>
  </a-collapse>
</template>

<style lang="less" scoped>
    :deep .ant-collapse-content > .ant-collapse-content-box {
        padding: 3px 16px;
    }
    .comps {
        display: flex;
        justify-content:start;
        flex-wrap: wrap;
        .c_item {
            width: 30%;
            padding: 5px;
            cursor: pointer;
            border-radius: 2px;
            &:hover, &:active,&:focus {
                background: rgb(243, 238, 238);
                cursor: move;
            }
        }
        
    }
</style>
