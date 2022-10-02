<script setup lang="ts">
import {getCurrentInstance } from 'vue';
const { proxy }: any = getCurrentInstance();
    defineProps({
        ItemInfo: {} as any
    })
</script>

<template>
    <a-button
        :style="ItemInfo.styles"
        :loading="ItemInfo.loading"
        :shape="ItemInfo.shape"
        :type="ItemInfo.type"
        :size="ItemInfo.size"
        :danger="ItemInfo.danger"
    >{{ItemInfo.title}}</a-button>
</template>

<style scoped>
</style>
