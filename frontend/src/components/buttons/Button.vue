<script setup lang="ts">
defineProps({
    title: {
        default: ''
    }
})
</script>

<template>
<a-button type="primary">{{title}}</a-button>
</template>

<style scoped>
</style>
