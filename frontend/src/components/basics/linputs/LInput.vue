
<script setup lang="ts">
import {getCurrentInstance } from 'vue';
const { proxy }: any = getCurrentInstance();
    defineProps({
        ItemInfo: {} as any
    })
</script>
<template>
  <a-input
    :id="ItemInfo.idd"
    :style="ItemInfo.styles"
    placeholder="Basic usage"
  />
</template>