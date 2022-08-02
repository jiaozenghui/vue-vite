<script setup lang="ts">
import {getCurrentInstance } from 'vue';
const { proxy }: any = getCurrentInstance();
    defineProps({
        ItemInfo: {} as any
    })

    function btnClick(e:any, element:any) {

      proxy.$ldrawer({confs: {
        visible:true,
        element: element
      }})
      e = e|| window.event;
      e.stopPropagation();
      
    }
</script>

<template>
    <a-button
        :style="ItemInfo.styles"
        :loading="ItemInfo.loading"
        :shape="ItemInfo.shape"
        @click="btnClick($event, ItemInfo)"
        :type="ItemInfo.type"
        :size="ItemInfo.size"
        :danger="ItemInfo.danger"
    >{{ItemInfo.title}}</a-button>
</template>

<style scoped>
</style>
