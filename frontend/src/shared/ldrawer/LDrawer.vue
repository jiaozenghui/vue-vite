<script setup lang="ts">
import { ref } from 'vue';
import draggable from "vuedraggable";
defineProps({
    confs: {} as any
})

</script>

<template>
<transition name="slide-fade">
    <div  class="setting-container">

    </div>
</transition>
</template>

<style lang="less" scoped>

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
