<script setup lang="ts">
import BaseHeader from "./BaseHeader.vue"
import { ref } from 'vue';


</script>

<template>
    <a-layout>
      <base-header></base-header>
      <a-layout-content>
        <router-view ></router-view>
      </a-layout-content>
    </a-layout>
</template>

<style scoped>
:deep(.ant-layout-content) {
    background-image: linear-gradient(160deg, #1a1f24 20%, #496f7e 80%);
    min-height: calc(100vh - 80px);
}
</style>
