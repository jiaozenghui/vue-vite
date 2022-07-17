<script setup lang="ts">
import draggable from "vuedraggable";
import { reactive, ref } from 'vue';
import LenovoButton from "@/components/buttons/LenovoButton.vue"
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
    const conf_c = ref({
      LenovoButton: LenovoButton
    })
</script>

<template>
    <a-row :gutter="[state.gutters[0], state.vgutters[0]]">
      
      <a-col
        v-for="col in itemInfo.cols"
        :key="col.idd"
        :span="col.span"
      >
        <draggable :list="col.comps" group="comp" item-key="idd" class="colDraggable">
            <template #item="{element}">
                <component
                    :key="element.idd"
                    :is="conf_c[element.comp_name]"
                    :confs="element.comp_confs"
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
        .colDraggable {
          height: 100%;
          width: 100%;
        }
    }
}
</style>
