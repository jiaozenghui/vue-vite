<script setup lang="ts">
import { ref } from 'vue';
import draggable from "vuedraggable";
import LayoutsSetting from '@/components/layouts/LayoutsSetting.vue';
import LButtonSetting from '@/components/basics/lbuttons/LButtonSetting.vue'
import LIconSetting from '@/components/basics/licons/LIconSetting.vue'
import LFormSetting from '@/components/templates/forms/LFormSetting.vue'
import LInputSetting from '@/components/basics/linputs/LInputSetting.vue'
import LCardSetting from '@/components/templates/cards/LCardSetting.vue'
import LZoneSetting from '@/components/zones/LZoneSetting.vue'
import LLabelSetting from '@/components/basics/llabels/LLabelSetting.vue'
import LChartSetting from '@/components/charts/echarts/LChartSetting.vue'
import LTabelSetting from '@/components/templates/tables/LTabelSetting.vue'
import LMapSetting from '@/components/charts/echarts/LMapSetting.vue'


import stastic_types_settings from '@/components/widgets/stastic_types/settings.vue'
import chart_seetings from '@/components/widgets/chart/settings.vue'

import {ColorPicker} from "vue3-colorpicker";
import "vue3-colorpicker/style.css";
const props = defineProps({
    confs: {} as any
})
const conf_c:any = {
  Layouts: LayoutsSetting,
  LButton: LButtonSetting,
  LIcon: LIconSetting,
  LForm: LFormSetting,
  LInput:LInputSetting,
  LCard:LCardSetting,
  LZone:LZoneSetting,
  LLabel:LLabelSetting,
  LChart:LChartSetting,
  LTabel:LTabelSetting,
  LMap:LMapSetting,
  stastic_type:stastic_types_settings,
  chart: chart_seetings
}

const isShow = ref(false)

const show = () => {
  isShow.value = true
}
const hide = () => {
  isShow.value = false
}

defineExpose({
  isShow,
  show,
  hide
})
function dataChange(res: any) {
  props.confs.dataChange(res);
}
</script>

<template>
<transition name="slide-fade">
    <div class="setting-container" v-if="isShow"  >
      <div class="fold" @click="hide()"> 》 </div>
      <component
          v-if="confs.element.comp_name == 'LChart' || confs.element.comp_name == 'LTabel'"
          :key="confs.idd"
          :is="conf_c[confs.element.comp_name]"
          :styleItems="confs.element.styles"
          :colStyleItems="confs.element.col_styles"
          :element="confs.element"
          @change="dataChange"
      ></component>
      <component
          v-else
          :key="confs.idd + 'test'"
          :is="conf_c[confs.element.comp_name]"
          :styleItems="confs.element.styles"
          :colStyleItems="confs.element.col_styles"
          :element="confs.element"
          @change="dataChange"
      ></component>
    </div>
</transition>
</template>

<style lang="less">
 .setting-container {
  padding:5px 10px;

  .fold {
    position: absolute;
    left: 1px;
    top: 50%;
    color: #766767;
    font-size: 30px;
    cursor: pointer;
    transform: scale(0.8,1.2);
  }
}
.slide-fade-enter-active {
  transition: all .3s ease-in;
}

.slide-fade-leave-active {
  transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  opacity: 0;
}
</style>
