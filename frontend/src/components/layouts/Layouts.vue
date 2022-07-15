<script setup lang="ts">
import draggable from "vuedraggable";
import Button from "@/components/buttons/Button.vue"
import { reactive, ref } from 'vue';
    defineProps({
        itemInfo: {}
    })
    const state = reactive<{
      gutters: { [key: number]: number };
      colCounts: { [key: number]: number };
      vgutters: { [key: number]: number };
    }>({
      gutters: {},
      colCounts: {},
      vgutters: {},
    });
    [0, 8, 16, 24, 32, 40, 48].forEach((value: number, i: number) => {
      state.gutters[i] = value;
    });
    [0, 8, 16, 24, 32, 40, 48].forEach((value, i) => {
      state.vgutters[i] = value;
    });
    [1, 2, 3, 4, 6, 8, 12].forEach((value, i) => {
      state.colCounts[i-1] = value;
    });
</script>

<template>
    <a-row :gutter="[state.gutters[itemInfo.confs['gutterKey']], state.vgutters[itemInfo.confs['vgutterKey']]]">
      
      <a-col
        v-for="item in itemInfo.confs['colCountKey']"
        :key="item.toString()"
        :span="24 / itemInfo.confs['colCountKey']"
      >
        <draggable :list="itemInfo.comps" group="components" class="colDraggable">
            <template #item="{element}">
                <component
                    :key="element.idd"
                    :is="element.comp_name"
                ></component>
            </template>
        </draggable>
      </a-col>
    </a-row>
</template>

<style lang="less" scoped>
.ant-row {
    min-height: 50px;
    border: 1px dashed rgb(192, 190, 190);
    :deep(.ant-col) {
        background: transparent;
        border-right: 1px dashed rgb(192, 190, 190);
        &:last-child {
            border-right: none;
        }
    }
}
</style>
