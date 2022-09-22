<script setup lang="ts">
import * as icons from '@ant-design/icons-vue';
defineProps({
    ItemInfo: {} as any
})
</script>

<template>
    <component
        :is="icons[ItemInfo.type_value]"
        :style="ItemInfo.styles"
        :type_value="ItemInfo.type_value"
    ></component>
</template>

<style scoped>
</style>
