<script setup lang="ts">
import { ref } from 'vue';
import draggable from "vuedraggable";
import LayoutsSetting from '@/components/layouts/LayoutsSetting.vue'
defineProps({
    confs: {} as any
})
const conf_c:any = ref({
  Layouts: LayoutsSetting
})
</script>

<template>
<transition name="slide-fade">
    <div class="setting-container" v-if="confs.visible"  >
      <component
          :key="confs.idd"
          :is="conf_c[confs.element.comp_name]"
          :styleItems="confs.element.styles"
      ></component>
    </div>
</transition>
</template>

<style lang="less">
 .setting-container {
  padding:20px
}
.slide-fade-enter-active {
  transition: all .3s ease-out;
}

.slide-fade-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
</style>
