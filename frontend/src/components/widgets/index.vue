<script setup lang="ts">
import draggable from "vuedraggable";
import { reactive, ref } from 'vue';
import { useStore } from "vuex";
import chart from "./chart/index.vue";

import {getCurrentInstance, ComponentInternalInstance } from 'vue';
const comps= ref({});
const { proxy }: any = getCurrentInstance();
defineProps({
    conf: {} as any
});
const conf_c:any = ref({
    chart: chart
})

const curent_comp= ref();
const changeData = (data:any) => {
    debugger
    curent_comp.value.changeData(data)
}
defineExpose({
    changeData,
})



</script>

<template>
    <component
        ref="curent_comp"
        :key="conf.id"
        :is="conf_c[conf.type]"
        :ItemInfo="conf"
    ></component>
</template>

<style lang="less" scoped>
.ant-row {
    height: 100%;
    border: 1px dashed rgb(241, 238, 238);
    flex-flow: inherit;
    :deep(.ant-col) {
        background: transparent;
        border-right: 1px dashed rgb(238, 235, 235);
        flex: 1;
        &:last-child {
            border-right: none;
        }
        .drag-div {
          width: 100%;
          padding: 15px;
        }
        .colDraggable {
          height: 100%;
        }
    }
}
</style>
