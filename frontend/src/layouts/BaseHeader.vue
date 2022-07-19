<script setup lang="ts">
import { ref } from 'vue';
import { useStore } from "vuex";
import CompContainer from "./CompContainer.vue"
const store = useStore();
const comps_sum = ref(store.state.comps_sum)

const activeKey = ref('layout');

function changeType (type:any) {
    store.commit('changeCompType', type)
}
</script>

<template>
  <a-tabs v-model:activeKey="activeKey" @tabClick="changeType($event)" >
    <a-tab-pane :key="m_comp.idd" :tab="m_comp.title"  v-for="m_comp in comps_sum">
        <comp-container></comp-container>
    </a-tab-pane>
  </a-tabs>
</template>

<style lang="less" scoped>
.ant-tabs-top > {
    :deep(.ant-tabs-nav){
        margin-bottom: 0;
        background: #000;
    }
}
</style>
