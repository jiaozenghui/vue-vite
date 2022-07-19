<script setup lang="ts">
import { ref } from 'vue';
import { useStore } from "vuex";
import draggable from "vuedraggable";
const store = useStore();
const activeKey = ref('1');

const curCompList = store.getters['curCompList'];
let i =0;
function cloneCompoents (cloneObj) {
    let newObj = JSON.parse(JSON.stringify(cloneObj));
    newObj.idd = 'test' + i++;
    return newObj;
}
</script>

<template>
    <draggable
        class="comps"
        :list="curCompList"
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
</template>

<style lang="less" scoped>
    .comps {
        display: flex;
        justify-content:start;
        flex-wrap: wrap;
        .c_item {
            width: 50px;
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
