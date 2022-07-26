<script setup lang="ts">
defineProps({
    confs: {} as any
})
</script>

<template>
<a-button type="primary">{{confs.title}}</a-button>
</template>

<style scoped>
</style>
