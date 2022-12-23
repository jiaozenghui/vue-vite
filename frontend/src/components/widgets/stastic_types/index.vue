<script setup lang="ts">
import { ref } from 'vue';
import draggable from "vuedraggable";
import page1 from './views/page1.vue';
import page2 from './views/page2.vue';

const props = defineProps({
    confs: {} as any
})
const conf_c:any = {
  page1: page1,
  page2: page2,

}

</script>

<template>
      <component
          :key="confs.idd + 'test'"
          :is="conf_c[confs.element.id]"
          :styleItems="confs.element.styles"
          :colStyleItems="confs.element.col_styles"
          :element="confs.element"
      ></component>
</template>

<style lang="less">
 .setting-container {
  padding:5px 10px;

  .fold {
    position:absolute;
    left: 2px;
    top: 50%;
    color: #fff;
    font-size: 30px;
    cursor: pointer;
  }
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
